import { v5 as uuid } from "uuid";
import ERROR_CODE from "../../constants/chatting/ERROR";
import { simpleUserInfo } from "../mypage";

// eslint-disable-next-line no-undef
export const client = new TalkPlus.Client({
  appId: import.meta.env.VITE_TALKPLUS_APP_ID,
});

export const login = async ({ userId, username, profileImageUrl }) => {
  try {
    const { user } = await client.loginAnonymous({
      userId: String(userId),
      username,
      profileImageUrl,
    });
    return user;
  } catch (error) {
    alert(JSON.stringify(error));
  }
};

export const relogin = async () => {
  const res = await simpleUserInfo();
  const { id, firstName, lastName, profileImage } = res.data.data;
  const userInfo = {
    userId: id,
    username: `${firstName} ${lastName}`,
    profileImageUrl: profileImage,
  };
  await login(userInfo);
};

export const getPublicChannels = async ({
  lastChannelId,
  searchValue,
  searchSubValue,
}) => {
  try {
    const body = { limit: 30 };
    if (lastChannelId) {
      body.lastChannelId = lastChannelId;
    }
    if (searchValue && searchValue.length > 0) {
      body.category = searchValue;
    }

    if (searchSubValue && searchSubValue.length > 0) {
      body.subcategory = searchSubValue;
    }

    const data = await client.getPublicChannels(body);
    return data;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      getPublicChannels({ lastChannelId, searchValue, searchSubValue });
    }
  }
};

export const getChannelDetail = async (channelId) => {
  try {
    const { channel } = await client.getChannel({
      channelId,
    });
    return channel;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      getChannelDetail(channelId);
    }
  }
};

export const getJoinedChannels = async ({
  lastChannelId,
  searchValue,
  searchSubValue,
}) => {
  try {
    const body = { limit: 30 };
    if (lastChannelId) {
      body.lastChannelId = lastChannelId;
    }
    if (searchValue && searchValue.length > 0) {
      body.category = searchValue;
    }

    if (searchSubValue && searchSubValue.length > 0) {
      body.subcategory = searchSubValue;
    }
    const data = await client.getChannels(body);
    return data;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      getJoinedChannels({ lastChannelId, searchValue, searchSubValue });
    }
  }
};

export const joinChannel = async (channelId) => {
  try {
    const data = await client.joinChannel({
      channelId: channelId,
    });
    return data;
  } catch (error) {
    if (error.code !== ERROR_CODE.ALREADY_MEMBER) {
      return alert(JSON.stringify(error));
    }
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      joinChannel(channelId);
    }
  }
};

export const createChannel = async (data) => {
  const { name, imageUrl, content, category } = data;
  try {
    const data = await client.createChannel({
      channelId: uuid(name, uuid.DNS),
      name,
      type: "super_public",
      reuseChannel: true,
      hideMessagesBeforeJoin: true,
      imageUrl,
      category,
      data: {
        content,
      },
    });
    return data;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      createChannel(data);
    }
  }
};

export const leaveChannel = async (channelId) => {
  try {
    const data = await client.leaveChannel({
      channelId: channelId,
    });
    return data;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      leaveChannel(channelId);
    }
  }
};

export const updateChannel = async (channelId, data) => {
  const { name, imageUrl = "", content = "", category, subcategory } = data;
  try {
    const data = await client.updateChannel({
      channelId,
      name,
      imageUrl,
      category,
      subcategory,
      data: {
        content,
      },
    });
    return data;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      updateChannel(channelId, data);
    }
  }
};

export const getMessages = async ({ channelId, lastMessageId }) => {
  try {
    const body = {
      channelId,
      order: "latest",
      limit: 70,
    };
    if (lastMessageId) {
      body.lastMessageId = lastMessageId;
    }

    const data = await client.getMessages(body);
    return {
      messages: data.messages.reverse(),
      hasNext: data.hasNext,
    };
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      getMessages({ channelId, lastMessageId });
    }
  }
};

export const addMessageText = async (channelId, messageText) => {
  try {
    const data = await client.sendMessage({
      channelId: channelId,
      type: "text",
      text: messageText,
    });
    return data;
  } catch (error) {
    if (error.code === ERROR_CODE.UNAUTHORIZED) {
      relogin();
      addMessageText(channelId, messageText);
    }
  }
};
