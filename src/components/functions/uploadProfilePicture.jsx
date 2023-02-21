import firebase from 'firebase/app';
import 'firebase/storage';

const uploadProfilePicture = async (file) => {
  const storageRef = firebase.storage().ref();
  const profilePictureRef = storageRef.child(`profile_pictures/${file.name}`);

  return new Promise((resolve, reject) => {
    const uploadTask = profilePictureRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });
};

export default uploadProfilePicture;
