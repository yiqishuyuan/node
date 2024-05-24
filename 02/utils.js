// 导入
import obj from './index.js'
console.log(obj.url)
console.log(obj.arrcon([1,2,3,4,5]))



// 在index.js中则可以重新导入新的单独的一些模块
// import { URLtwo } from './index.js'
import { URLtwo,funtionarr } from './index.js'
console.log(URLtwo)
console.log(funtionarr([1,2,3,4,5]))