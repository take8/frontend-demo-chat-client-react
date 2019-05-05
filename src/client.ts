import Axios, { AxiosInstance, AxiosResponse, CancelToken } from "axios";

const baseUrl = "https://us-central1-frontend-demo-chat.cloudfunctions.net/v1";

const instance: AxiosInstance = Axios.create({
  baseURL: baseUrl,
  timeout: 10000
});

export interface Channel {
  name: string;  
}

export interface Message {
  id?: string;
  body?: string;
  user: {
    id?: string;
    name?: string;
    avatar?: string;
  };
  date?: string;
}

/**
 * チャンネル一覧を取得する
 * @param params 
 * @param cancelToken 
 */
export const fetchChannels = (
  params = {},
  // TODO: とりあえず暫定的にトークンを生成
  cancelToken: CancelToken = Axios.CancelToken.source().token
): Promise<AxiosResponse<{ channels: string[] }>> => {
  return instance.get(`/channels`, {
    params,
    cancelToken
  });
}

/**
 * メッセージ一覧を取得する
 * @param channelName 
 * @param params 
 * @param cancelToken 
 */
export const fetchMessages = (
  channelName: string,
  params = {},
  // TODO: とりあえず暫定的にトークンを生成
  cancelToken: CancelToken = Axios.CancelToken.source().token
): Promise<AxiosResponse<{ messages: Message[] }>> => {
  return instance.get(`/channels/${channelName}/messages`, {
    params,
    cancelToken
  });
};

/**
 * メッセージを登録する
 * @param channelName 
 * @param payload 
 * @param cancelToken 
 */
export const postMessage = (
  channelName: string,
  payload: Message,
  cancelToken: CancelToken = Axios.CancelToken.source().token
) => {
  return instance.post(`/channels/${channelName}/messages`, payload, {
    cancelToken
  });
};
