import React, { useState, useEffect } from 'react';
import ProfileAvatar from './ProfileAvatar';
import userApi from '../../api/userApi';

const ProfileSection = ({ userInfo, onProfileUpdate }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState(userInfo?.nickname || '');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // userInfo가 업데이트되면 nickname 상태 업데이트
    if (userInfo?.nickname) {
      setNickname(userInfo.nickname);
    }
  }, [userInfo]);

  const handleProfileImageChange = (fileObject) => {
    // fileObject는 이미 유효한 File 객체이므로 바로 저장
    setProfileImage(fileObject);
    // 에러 메시지 초기화
    setError('');
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    // 에러 메시지 초기화
    setError('');
  };

  const handleProfileUpdate = async () => {
    // 닉네임과 프로필 이미지 중 하나라도 입력되었는지 확인
    if (!nickname && !profileImage) {
      setError('닉네임 또는 프로필 이미지를 변경해주세요.');
      return;
    }

    // 닉네임 유효성 검사 (2글자 이상, 10글자 이하)
    if (nickname && (nickname.length < 2 || nickname.length > 10)) {
      setError('닉네임은 2~10자 이내로 입력해주세요.');
      return
    }

    setIsLoading(true);

    try {
      // 프로필 업데이트 데이터 준비
      const updateData = {};
      
      // 닉네임이 변경된 경우에만 포함
      if (nickname !== userInfo?.nickname) {
        updateData.nickname = nickname;
      }
      
      // 프로필 이미지가 선택된 경우에만 포함
      if (profileImage) {
        updateData.profileImage = profileImage;
      }
      
      console.log('프로필 업데이트 요청 데이터:', 
        updateData.nickname ? '닉네임 변경 있음' : '닉네임 변경 없음', 
        updateData.profileImage ? '이미지 변경 있음' : '이미지 변경 없음'
      );
      
      const response = await userApi.updateUserProfile(updateData);
      console.log('프로필 업데이트 응답:', response);

      setSuccessMessage('프로필이 성공적으로 수정되었습니다.');
      
      // 상위 컴포넌트에 업데이트 알림
      if (onProfileUpdate) {
        // 업데이트된 사용자 정보 생성
        const updatedUserInfo = {
          ...userInfo,
          nickname: nickname
          // 프로필 이미지는 서버에서 새로운 정보를 받아와야 하므로 여기서 업데이트하지 않음
        };
        
        onProfileUpdate(updatedUserInfo);
      }
      
      // 파일 업로드 후 프로필 이미지 상태 초기화
      setProfileImage(null);

      setTimeout(() => {
        window.location.reload();
      }, 0);
      
      // 3초 후 성공 메시지 사라지게 설정
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      if (error.response) {
        // 서버에서 응답이 온 경우
        if (error.response.status === 400) {
          // 유효성 검사 실패
          if (error.response.data.error.errors?.nickname) {
            setError(error.response.data.error.errors.nickname);
          } else {
            setError(error.response.data.error.message || '입력값을 확인해주세요.');
          }
        } else {
          // 기타 서버 오류
          setError(error.response.data.error.message || '서버 오류가 발생했습니다.');
        }
      } else {
        // 네트워크 오류 등
        setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('API 요청 에러:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8 p-6 rounded-xl w-full max-w-md">
      {/* 프로필 아바타 */}
      <div className="mb-6">
        <ProfileAvatar
          initialImage={userInfo?.profileImg}
          onImageChange={handleProfileImageChange}
        />
      </div>
      
      {/* 닉네임 및 이메일 필드 */}
      <div className="w-full space-y-4">
        {/* 닉네임 필드 */}
        <div className="flex">
          <div className="text-sm font-medium w-[60px] pt-2">닉네임</div>
          <div className="flex-1">
            <input
              type="text"
              className="w-[284px] h-[43px] bg-[#07093d]/60 rounded-full px-4 py-2 text-sm border border-[#4A4FBA]/40"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="10자 이내 닉네임을 입력하세요"
              maxLength={10}
            />
            <div className="text-xs text-blue-300 mt-1 ml-4">
              *수정할 닉네임을 입력해주세요. (2~10자 이내)
            </div>
          </div>
        </div>
        
        {/* 이메일 필드 */}
        <div className="flex">
          <div className="text-sm font-medium w-[60px] pt-2">이메일</div>
          <div className="flex-1">
            <div className="w-[284px] h-[43px] rounded-full px-4 flex items-center text-sm">
              {userInfo?.email || ''}
            </div>
          </div>
        </div>
      </div>
      
      {/* 에러 메시지 */}
      {error && (
        <div className="w-full mt-4 text-red-500 text-sm text-center">
          {error}
        </div>
      )}
      
      {/* 성공 메시지 */}
      {successMessage && (
        <div className="w-full mt-4 text-green-500 text-sm text-center">
          {successMessage}
        </div>
      )}
      
      {/* 프로필 수정 버튼 */}
      <button
        className={`bg-[#1631FE] hover:bg-blue-700 text-white rounded-full py-2 px-8 text-sm mt-8 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={handleProfileUpdate}
        disabled={isLoading}
      >
        {isLoading ? '처리 중...' : '프로필 수정하기'}
      </button>
    </div>
  );
};

export default ProfileSection;