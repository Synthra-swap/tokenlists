import { Network } from '../../types'
import uomi from './tokens/uomi'
import irys from './tokens/irys'
import helios from './tokens/helios'
import arc from './tokens/arc'


export const tokens = {
  [Network.Uomi]: uomi,
  [Network.Irys]: irys,
  [Network.arc]: arc,
  [Network.Helios]: helios,
}
