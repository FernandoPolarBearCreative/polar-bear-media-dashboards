const base = 'https://enotecca-lka-test---pb-ads-google-connector-r6hihlwcra-uc.a.run.app';
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
function validDay(value){return typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value;}
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeData(value,key=''){
 if(typeof value==='string')return /^(name|ad_name|campaign_name|adset_name|region|descriptiveName)$/.test(key)?escape(value):value;
 if(Array.isArray(value))return value.map(x=>safeData(x,key));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([k])=>!['access_token','paging'].includes(k)).map(([k,v])=>[k,safeData(v,k)]));
 return value;
}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(url.pathname.startsWith('/api/')){
  if(!request.headers.get('oai-authenticated-user-id'))return json({error:'Sign in required'},401);
  if(request.method!=='GET')return json({error:'Method not allowed'},405);
  const endpoint=({'/api/google-performance':'google-performance','/api/meta-performance':'meta-performance'})[url.pathname];
  if(!endpoint)return json({error:'Not found'},404);
  const startDate=url.searchParams.get('startDate'),endDate=url.searchParams.get('endDate');
  if(!validDay(startDate)||!validDay(endDate)||startDate>endDate||Date.parse(endDate)-Date.parse(startDate)>365*86400000)return json({error:'Select valid dates covering at most 366 days'},400);
  const params=new URLSearchParams({startDate,endDate});
  if(endpoint==='meta-performance'){
   const id=url.searchParams.get('accountId');
   const allowed=CLIENT==='lka'?['4250540271898801']:['913601552530100','2880495615400590'];
   if(!allowed.includes(id))return json({error:'Account is not mapped to this report'},403);
   params.set('accountId',id);
  }
  const key=env.PB_REPORT_KEY;
  if(typeof key!=='string'||key.length<32)return json({error:'Report connection is not configured'},503);
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),110000);
  try{
   const upstream=await fetch(base+'/api/client/'+CLIENT+'/'+endpoint+'?'+params,{
    headers:{'x-pb-report-key':key},redirect:'manual',signal:controller.signal
   });
   if(!upstream.ok)return json({error:'Reporting source unavailable. Please try again or contact Polar Bear.',connectorStatus:upstream.status},502);
   const data=await upstream.json();
   if(endpoint==='meta-performance'&&(!Array.isArray(data.insights)||!Array.isArray(data.ads)))throw Error('Invalid Meta report');
   if(endpoint==='google-performance'&&!Array.isArray(data)&&!Array.isArray(data.results))throw Error('Invalid Google report');
   return json(safeData(data));
  }catch(error){console.error('Report request failed', {client:CLIENT,endpoint,errorType:error?.name||'Error',reason:String(error?.message||'').replaceAll(key,'[redacted]').slice(0,300)});return json({error:'The reporting source could not complete the request. Please try again.'},502);}
  finally{clearTimeout(timeout);}
 }
 if(!['GET','HEAD'].includes(request.method))return json({error:'Method not allowed'},405);
 const asset=Object.hasOwn(assets,url.pathname)?assets[url.pathname]:null;
 return asset?new Response(request.method==='HEAD'?null:Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)),{headers:{'Content-Type':asset.type,'Cache-Control':'private, no-cache','X-Content-Type-Options':'nosniff'}}):new Response('Not found',{status:404});
}};

