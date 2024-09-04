// PubSub.ts
type CallbackFunction = (data: any) => void;

class PubSub {
  private subscribers: Record<string, CallbackFunction[]> = {};

  subscribe(event: string, callback: CallbackFunction): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  unsubscribe(event: string, callback: CallbackFunction): void {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(
        (sub) => sub !== callback,
      );
    }
  }

  publish(event: string, data: any): void {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => callback(data));
    }
  }
}

export const pubsub = new PubSub();
