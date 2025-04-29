import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Assume you have Firebase functions initialized in '../firebase'
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore'; // If storing extra info in Firestore
import { db } from '../firebase'; // Assuming db export from firebase.js for Firestore
// Import Redux actions from your userSlice
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../features/user/userSlice'; // Adjust path if needed

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = getAuth();
  const storage = getStorage(); // Initialize Firebase Storage

  // State for form data - Initialize with currentUser data
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    photoURL: currentUser?.photoURL || '',
    // Add other fields if needed, e.g., bio: currentUser?.bio || ''
  });

  // State for file upload
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null); // For preview or direct use
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Ref for the hidden file input
  const filePickerRef = useRef(null);

  // Effect to handle file upload when imageFile state changes
  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]); // Run only when imageFile changes

  // Effect to update formData if currentUser changes (e.g., after login)
  useEffect(() => {
    setFormData({
        username: currentUser?.username || '',
        email: currentUser?.email || '',
        photoURL: currentUser?.photoURL || '',
        // other fields...
    });
    // Set the preview URL from currentUser initially or after update
    setImageFileUrl(currentUser?.photoURL || null);
  }, [currentUser]);

  // Generic change handler for form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        // Optionally, create a temporary preview URL
        setImageFileUrl(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  // Handle Firebase Storage upload
  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0); // Reset progress

    // Create unique filename (e.g., using userId and timestamp)
    const fileName = `${auth.currentUser.uid}-${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `avatars/${fileName}`); // Store in 'avatars' folder
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
        // console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload Error:", error);
        setUploadError('Image upload failed (max 2MB recommended).');
        setIsUploading(false);
        setImageFile(null); // Reset file state
        setImageFileUrl(currentUser?.photoURL || null); // Revert preview
        setUploadProgress(null);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          // Update formData state immediately with the new URL
          setFormData({ ...formData, photoURL: downloadURL });
          setImageFileUrl(downloadURL); // Keep preview updated
          setIsUploading(false);
          setUploadProgress(null); // Clear progress
          setImageFile(null); // Clear the file state now that it's uploaded
        });
      }
    );
  };


  // Handle form submission (Profile Update)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    // console.log("Form Data on Submit:", formData);
    // console.log("Current User Before:", currentUser);

    // Check if anything actually changed (optional but good practice)
    const isUsernameChanged = formData.username !== currentUser.username;
    const isPhotoChanged = formData.photoURL !== currentUser.photoURL; // Check if URL changed (meaning upload finished)

    if (!isUsernameChanged && !isPhotoChanged) {
      // console.log("No changes detected.");
      // Maybe show a message "No changes to save"
      return;
    }

    try {
      dispatch(updateUserStart());

      // 1. Update Firebase Auth profile (displayName, photoURL)
      await updateProfile(auth.currentUser, {
        displayName: formData.username,
        photoURL: formData.photoURL, // Use the potentially new URL from state
      });

      // 2. (Optional) Update Firestore document if you store extra info there
      // const userDocRef = doc(db, 'users', currentUser.uid);
      // await updateDoc(userDocRef, {
      //   username: formData.username,
      //   photoURL: formData.photoURL,
      //   // Add other fields like bio: formData.bio
      // });

      // 3. Dispatch success action to update Redux store
      // We need the updated user object. Firebase Auth doesn't return it directly from updateProfile.
      // So we create an updated user object based on our formData.
      const updatedUser = {
          ...currentUser, // Keep existing uid, email etc.
          username: formData.username,
          photoURL: formData.photoURL,
      };
      dispatch(updateUserSuccess(updatedUser));
      // console.log("Profile updated successfully!");
      // Maybe show a success toast/message here

    } catch (err) {
      console.error("Profile Update Error:", err);
      dispatch(updateUserFailure(err.message));
       // Maybe show an error toast/message here
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
        dispatch(signOutUserStart());
        await signOut(auth);
        dispatch(signOutUserSuccess());
        // No need to navigate here usually, PrivateRoute should handle redirect
    } catch (err) {
        console.error("Sign Out Error:", err);
        dispatch(signOutUserFailure(err.message));
    }
  };

  // Handle Delete Account (Example - Implement with caution!)
  const handleDeleteAccount = async () => {
    // Add confirmation dialog first!
    if (!window.confirm("Are you SURE you want to delete your account? This action cannot be undone.")) {
        return;
    }
    try {
        dispatch(deleteUserStart());
        // Needs recent login - might require re-authentication
        // await deleteUser(auth.currentUser); // This is the Firebase Auth delete
        // Also delete associated Firestore data / Storage files if necessary
        dispatch(deleteUserSuccess());
         console.warn("Account deletion needs re-authentication and backend cleanup logic!");
        // Navigate to signup or home page
    } catch (err) {
        console.error("Delete Account Error:", err);
        dispatch(deleteUserFailure(err.message));
        // Handle re-authentication requirement error specifically if needed
    }
  };

  // Determine if the update button should be enabled
  const canUpdate = (formData.username !== currentUser?.username || imageFile !== null) && !isUploading; // Enable if username changed OR a new file is selected/uploading(finished)


  return (
    <div className="p-3 max-w-lg mx-auto"> {/* Container */}
      <h1 className="text-3xl font-semibold text-center my-7 text-slate-100">Profile</h1>

      {/* Error message display */}
      {error && <p className="text-red-500 mt-5 text-center">Error: {error}</p>}
      {uploadError && <p className="text-red-500 mt-5 text-center">{uploadError}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden file input */}
        <input
          type="file"
          ref={filePickerRef}
          hidden
          accept="image/*" // Only accept image files
          onChange={handleFileChange}
        />

        {/* Profile picture - make it clickable */}
        {/* Use imageFileUrl for preview, fallback to currentUser.photoURL */}
        <img
          src={imageFileUrl || formData.photoURL || 'https://via.placeholder.com/150?text=No+Image'} // Provide a default placeholder
          alt="Profile Avatar"
          onClick={() => filePickerRef.current.click()} // Trigger file input click
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-2 border-slate-400 hover:border-slate-200 transition-colors"
          title="Click to upload a new image"
        />

        {/* Display upload progress/status */}
        {isUploading && (
          <p className='text-sm self-center text-slate-300'>
            {uploadProgress !== null ? `Uploading: ${uploadProgress}%` : 'Uploading...'}
          </p>
        )}


        {/* Email input (disabled) */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border p-3 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          value={formData.email}
          disabled // Email is typically not changed here
        />

        {/* Username input */}
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Update button */}
        <button
          type="submit"
          disabled={loading || isUploading || !canUpdate} // Disable if loading, uploading, or no changes
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? 'Loading...' : 'Update Profile'}
        </button>

        {/* Add Create Listing Button Link Here if needed */}
        {/* <Link to="/create-listing" className='...'>Create Listing</Link> */}

      </form>

      {/* Other Actions */}
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-500 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>

    </div>
  );
}

export default Profile;