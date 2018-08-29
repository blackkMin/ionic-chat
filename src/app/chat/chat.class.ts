export interface IChat {
  conversationType?: string;
  extra?: any;
  latestMessage?: any;
  target?: any;
  title?: string;
  unreadCount?: number;
}

export class Chat{
  conversationType: string;
  extra: any;
  latestMessage: any;
  target: any;
  title: string;
  unreadCount: number;

  constructor(item?: IChat){
    if(item){
      this.conversationType = item.conversationType;
      this.extra = item.extra;
      this.latestMessage = item.latestMessage;
      this.target = item.target;
      this.title = item.title;
      this.unreadCount = item.unreadCount;
    }
  }
}
