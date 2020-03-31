import Vue from 'vue'
import { ApiPromise, WsProvider } from '@polkadot/api';

interface ApiServiceInterface {
  init(apiUrl: string): Promise<void>;
}


// Idea. 
/**
 * ApiService - Magic under the hood™️
 */
class ApiService extends Vue implements ApiServiceInterface {
  private tick = 0;
  private _api: any;

  public mounted() {
    this.init();
  }

  public async init(apiUrl: string = 'wss://substrate-rpc.parity.io/') {
    const provider = new WsProvider(apiUrl);
    const types = {};
    this._api = await ApiPromise.create({provider, types});
    this.$emit('change', await this._api.isReady())
  }

  

  public hei() {
    this.$emit('tick', this.tick)
    this.tick = this.tick + 1
  }


}


const bus = new ApiService();
export default bus

// Idea. make builder pattern for api ? Api.query('').withParams([])
