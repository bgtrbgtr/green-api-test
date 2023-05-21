export const BASE_URL = "https://api.green-api.com";

const request = ({ url, method = "GET", data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  });
};

export const authorize = (idInstance, apiTokenInstance) => {
  return request({
    url: `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
  });
};

export const getLastOutgoingMessages = (
  idInstance,
  apiTokenInstance,
  minutes_count = 1440
) => {
  return request({
    url: `/waInstance${idInstance}/LastOutgoingMessages/${apiTokenInstance}?minutes=${minutes_count}`,
  });
};

export const getLastIncomingMessages = (
  idInstance,
  apiTokenInstance,
  minutes_count = 1440
) => {
  return request({
    url: `/waInstance${idInstance}/LastIncomingMessages/${apiTokenInstance}?minutes=${minutes_count}`,
  });
};

export const getChatHistory = (idInstance, apiTokenInstance, chatId) => {
  return request({
    url: `/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
    method: "POST",
    data: {
      chatId: chatId,
      count: 20,
    },
  });
};

export const getContactInfo = (idInstance, apiTokenInstance, chatId) => {
  return request({
    url: `/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
    method: "POST",
    data: {
      chatId: `${chatId}@c.us`,
    },
  });
};

export const sendMessage = (idInstance, apiTokenInstance, chatId, message) => {
  return request({
    url: `/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    method: "POST",
    data: {
      chatId: chatId,
      message: message,
    },
  });
};

export const receiveMessage = (idInstance, apiTokenInstance) => {
  return request({
    url: `/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
  });
};

export const deleteNotification = (idInstance, apiTokenInstance, receiptId) => {
  return request({
    url: `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
    method: "DELETE",
  });
};
