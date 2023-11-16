import { XSSCheck } from "../../../utils/chatting/messageCheck";
import { convertDate } from "../../../utils/date";

/**
 * @typedef {Object} Message
 * @property {string} text
 * @property {string} createdAt
 */

/**
 * ReceivedMessage component
 * @param {Message} message
 * @returns JSX.Element
 */
const ReceivedMessage = ({ message }) => {
  const { username, text, createdAt } = message;
  const profileImageUrl = message.profileImageUrl
    ? message.profileImageUrl
    : "./images/user_0.png";

  return (
    <div className="grid grid-cols-[3rem_1fr_6rem] gap-2 items-end py-2 w-fit max-w-[60%]">
      <div className="h-full pt-3">
        <img
          src={profileImageUrl}
          alt="프로필"
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            e.target.src =
              "https://w7.pngwing.com/pngs/529/816/png-transparent-computer-icons-user-profile-avatar-heroes-monochrome-black.png";
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm text-gray-600">{username}</div>
        <div className="bg-gray-200 p-3 rounded-lg w-fit text-black">
          {XSSCheck(text)}
        </div>
      </div>
      <div className="text-xs text-gray-500">{convertDate(createdAt)}</div>
    </div>
  );
};

export default ReceivedMessage;
