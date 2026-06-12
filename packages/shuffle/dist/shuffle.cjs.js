"use strict";module.exports.create=a=>{if(!a||!a.array)return null;var r=a.array.slice(0);return{shuffle:function(){var t=0,n=0,e=null;for(t=r.length-1;t>0;t-=1)n=Math.floor(Math.random()*(t+1)),e=r[t],r[t]=r[n],r[n]=e;return r}}};
//# sourceMappingURL=shuffle.cjs.js.map
