import React, { useState, useRef } from 'react';

function ProfileAvatar({ initialImage = null, onImageChange = () => {} }) {
  const [image, setImage] = useState(initialImage);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 파일 유효성 검사
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      // 파일 크기 제한 (5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        alert('이미지 크기는 5MB 이하만 가능합니다.');
        return;
      }
      
      // 이미지 미리보기 생성 및 파일 객체 전달
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        // File 객체 자체를 상위 컴포넌트로 전달 (중요 부분)
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative cursor-pointer" onClick={handleUploadButtonClick}>
      {image ? (
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <img src={image} alt="User Profile" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-[80px] h-[80px] rounded-full bg-[#b8c0ff] flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#24248f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="#24248f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}

export default ProfileAvatar;