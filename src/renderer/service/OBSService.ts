import OBSWebSocket from 'obs-websocket-js';
import { obsPort, obsIp, obsPassword } from '../constants';

class OBSService {
  private obs: OBSWebSocket;

  constructor() {
    this.obs = new OBSWebSocket();
    this.connect();
  }

  public async connect() {
    const ip = localStorage.getItem(obsIp || '');
    const port = localStorage.getItem(obsPort || '');
    const password = localStorage.getItem(obsPassword || '');
    const url = `ws://${ip}:${port}`;

    if (ip !== '' && port !== '' && password !== '') {
      try {
        await this.obs.connect(url, password as string);
      } catch (error) {
        return error;
      }
    }
  }

  public async startTransmission() {
    try {
      await this.obs.call('StartStream');
    } catch (error) {
      console.error('Error starting transmission:', error);
    }
  }

  public async getScenes(): Promise<any[]> {
    try {
      const { scenes } = await this.obs.call('GetSceneList');
      return scenes;
    } catch (error) {
      console.error('Error retrieving scenes:', error);
      throw error;
    }
  }

  public async switchScene(sceneName: string) {
    try {
      await this.obs.call('SetCurrentProgramScene', { sceneName: sceneName });
    } catch (error) {
      console.error('Error switching scenes:', error);
    }
  }

  public async endTransmission() {
    try {
      await this.obs.call('StopStream');
    } catch (error) {
      console.error('Error ending transmission:', error);
    }
  }
}

export default new OBSService();
