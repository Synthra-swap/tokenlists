import { Network } from '../../types'
import uomi from './tokens/uomi'
import irys from './tokens/irys'
import helios from './tokens/helios'


export const tokens = {
  [Network.Uomi]: uomi,
  [Network.Irys]: irys,
  [Network.Helios]: helios,
}
