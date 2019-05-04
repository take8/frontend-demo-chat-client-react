import Axios, { AxiosInstance, AxiosResponse, CancelToken } from "axios";

const baseUrl = "https://us-central1-frontend-demo-chat.cloudfunctions.net/v1";

const instance: AxiosInstance = Axios.create({
  baseURL: baseUrl,
  timeout: 10000
});

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