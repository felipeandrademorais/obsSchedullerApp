import OBSWebSocket from 'obs-websocket-js';
import { obsUrl, obsPassword } from '../constants';

class OBSService {
  private obs: OBSWebSocket;

  constructor() {
    this.obs = new OBSWebSocket();
    this.connect();
  }

  public async connect() {
    //const url = 'ws://192.168.68.117:4455';
    //const password = 'password';

    const url = localStorage.getItem(obsUrl || '');
    const password = localStorage.getItem(obsPassword || '');

    if (url && password) {
      try {
        const response = await this.obs.connect(url, password);
        console.log('Connected to OBS:', response);
      } catch (error) {
        console.error('Failed to connect to OBS:', error);
      }
    }
  }

  public async startTransmission() {
    try {
      await this.obs.call('StartStream');
      console.log('Transmission started.');
    } catch (error) {
      console.error('Error starting transmission:', error);
    }
  }

  public async getScenes(): Promise<any[]> {
    try {
      const { scenes } = await this.obs.call('GetSceneList');
      console.log('Scenes retrieved:', scenes);
      return scenes;
    } catch (error) {
      console.error('Error retrieving scenes:', error);
      throw error;
    }
  }

  public async switchScene(sceneName: string) {
    try {
      await this.obs.call('SetCurrentProgramScene', { sceneName: sceneName });
      console.log(`Switched to scene: ${sceneName}`);
    } catch (error) {
      console.error('Error switching scenes:', error);
    }
  }

  public async endTransmission() {
    try {
      await this.obs.call('StopStream');
      console.log('Transmission ended.');
    } catch (error) {
      console.error('Error ending transmission:', error);
    }
  }
}

export default new OBSService();
