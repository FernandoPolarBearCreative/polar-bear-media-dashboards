const ad=(name,brand,platform,format,spend,ctr,conv,campaign,objective,impressions)=>({name,brand,platform,format,spend,ctr,conv,campaign,objective,impressions});
const datasets={
  lka:{title:'LKA dashboard',brands:[['all','All LKA locations'],['fraser','LKA Fraser'],['edgemont','LKA Edgemont']],external:'Jumbula registrations',externalCount:96,summary:'LKA generated 114 tracked actions across paid media and Jumbula.',summaryText:'Google Ads is currently delivering the strongest cost efficiency, while Meta continues to support discovery and broader demand generation. Fraser is producing the largest share of total registrations.',sources:[['Google Ads',61],['Meta Ads',53],['Jumbula',96]],segments:[['Parents of children 6–12',42],['Family activities',31],['Cooking & education',27]],ages:[['35–44',38],['25–34',29],['45–54',21],['55+',12]],regions:[['Fraser area',5530,68,81.32,60],['Edgemont area',3740,46,81.30,40]],insights:['Google Search is producing the lowest cost per registration.','Fraser contributes the largest share of tracked registrations.','Meta video ads are generating stronger CTR than static images.'],ads:[
    ad('Fall Skills — Video','LKA Fraser','meta','Video',920,2.74,13,'LKA Fraser — Fall Programs','Conversions',33580),ad('Kids Cook Real Food','LKA Fraser','meta','Single image',710,1.98,7,'LKA Fraser — Fall Programs','Reach',35860),ad('Weeklong Classes','LKA Fraser','google','Search',1260,3.42,22,'LKA Fraser — Search','Leads',36840),ad('Drop-in Classes','LKA Fraser','google','Search',1250,2.94,15,'LKA Fraser — Search','Leads',42510),ad('Fall Skills — Video','LKA Edgemont','meta','Video',760,2.41,9,'LKA Edgemont — Fall Programs','Conversions',31540),ad('Independence in the Kitchen','LKA Edgemont','meta','Carousel',680,1.87,6,'LKA Edgemont — Fall Programs','Reach',36360),ad('Kids Cooking Classes','LKA Edgemont','google','Search',950,3.08,17,'LKA Edgemont — Search','Leads',30840),ad('Performance Max — Fall','LKA Edgemont','google','PMax',900,2.33,25,'LKA Edgemont — PMax','Conversions',38620)
  ]},
  enotecca:{title:'Enotecca dashboard',brands:[['all','All Enotecca brands'],['las','LaStella'],['lvp','Le Vieux Pin']],external:'Commerce platform sales',externalCount:null,summary:'Enotecca generated 172 paid-media conversions across LaStella and Le Vieux Pin.',summaryText:'Le Vieux Pin is leading conversion efficiency, while LaStella is generating greater reach. Commerce-platform sales will be added once the source is identified and connected.',sources:[['Google Ads',83],['Meta Ads',89],['Commerce platform',null]],segments:[['Wine enthusiasts',46],['Premium shoppers',32],['Food & travel',22]],ages:[['45–54',34],['35–44',27],['55–64',24],['65+',15]],regions:[['Quebec',6730,72,93.47,46],['Ontario',4280,49,87.35,29],['Alberta',2190,26,84.23,15],['Okanagan & SK',1550,25,62,10]],insights:['Le Vieux Pin is generating the strongest conversion efficiency.','Quebec contributes the most conversions, but Ontario is more cost-efficient.','Carousel ads are supporting product discovery while single-image ads drive more direct response.'],ads:[
    ad('French Wine Society','Le Vieux Pin','meta','Single image',1420,2.81,22,'LVP — Quebec Wine Society','Conversions',50530),ad('12 Bottles, One Delivery','Le Vieux Pin','meta','Carousel',1180,2.43,16,'LVP — Quebec Wine Society','Conversions',48560),ad('LVP Wine Society','Le Vieux Pin','google','Search',1510,3.36,27,'LVP — Search','Sales',44940),ad('Discover the Okanagan','Le Vieux Pin','google','PMax',1020,2.22,19,'LVP — Performance Max','Sales',45950),ad('LaStella Society','LaStella','meta','Single image',1550,2.29,18,'LAS — Wine Society','Conversions',67680),ad('Italian Soul, BC Terroir','LaStella','meta','Carousel',1310,1.96,14,'LAS — Wine Society','Reach',66840),ad('LaStella Wine Club','LaStella','google','Search',1440,3.18,24,'LAS — Search','Sales',45280),ad('Curated Wine Delivery','LaStella','google','PMax',1320,2.37,32,'LAS — Performance Max','Sales',55690)
  ]}
};
const businessData={
  lka:{platform:'Jumbula',state:'Report sample · Aug 1–Sep 5',locations:['Fraser','Edgemont'],daily:{Fraser:[['Aug 25',135.45],['Aug 26',82.95],['Aug 28',2041.20],['Aug 29',435.75],['Aug 30',851.55],['Aug 31',344.48],['Sep 1',687.28],['Sep 2',541.80],['Sep 4',406.35],['Sep 5',270.90]],Edgemont:[['Aug 25',572.25],['Aug 28',1512],['Aug 29',135.45],['Aug 31',327.60],['Sep 1',1878.45],['Sep 2',270.90],['Sep 4',681.45],['Sep 5',135.45]]},category:{Fraser:[['Meals on the Go',2573.63],['Single / PRO-D Classes',1146.13],['Bake Sale Classics',815.85],['Winter Break: Edible Gifts',768.60],['Toddler Classes',248.85],['From Scratch vs. Store-Bought',244.65]],Edgemont:[['Meals on the Go',1411.20],['Bake Sale Classics',1310.40],['Supper Club',1201.20],['Private Class',1048.95],['Single / PRO-D Classes',541.80]]},age:{Fraser:[['Ages 2–3',248.85],['Ages 3–5',2452.75],['Ages 6–8',2660.36],['Ages 8–10',0],['Ages 9–12',435.75]],Edgemont:[['Ages 3–5',1004.85],['Ages 6–8',2341.50],['Ages 9–12',2167.20]]},agePlatform:{Fraser:[['18–24',0,2],['25–34',1,8],['35–44',18,44],['45–54',2,14],['55–64',0,2],['65+',0,5]],Edgemont:[['18–24',0,13],['25–34',1,10],['35–44',2,13.98],['45–54',1,18.5],['55–64',0,7],['65+',0,7]]},social:[['Facebook likes',1,1],['Instagram follows',8,9],['Page engagement',3054,1849]],creative:[['Video leads','Video creatives consistently deliver stronger conversion rates.'],['Top creatives','Fraser: 7 purchases · Edgemont: 2 purchases'],['Quality ranking','Average']],pmax:[['Edgemont','Highest efficiency at CA$2.62 per conversion. The CA$29/day budget is limiting additional demand; mobile leads at CA$2.53 CPA.'],['Fraser','109 conversions at CA$4.57 CPA. Mobile is strongest at CA$4.17 CPA versus CA$7.24 on desktop; diversify video assets to improve efficiency.']]},
  enotecca:{platform:'Commerce7',state:'Commerce7 connection pending',locations:['LaStella','Le Vieux Pin'],daily:null,category:null,age:null,agePlatform:{LaStella:[['25–34',4,6],['35–44',8,13],['45–54',11,17],['55–64',7,12],['65+',4,8]],'Le Vieux Pin':[['25–34',5,7],['35–44',10,15],['45–54',13,18],['55–64',8,11],['65+',5,9]]},social:[['Facebook likes','—','—'],['Instagram follows','—','—'],['Page engagement','—','—']],creative:[['Best format','Single-image and carousel performance can be compared after live creative data is connected.'],['Meta creative view','Ad previews, purchases, CTR and quality ranking are ready to populate.'],['Quality ranking','Awaiting live data']],pmax:[['LaStella','Performance Max insight will combine spend, revenue, ROAS, device efficiency and asset-group performance.'],['Le Vieux Pin','Commerce7 revenue will make it possible to compare platform conversions with verified orders and customer value.']]}
};
datasets.enotecca.ads.push(ad('Masterpiece Gallery — Traffic','Le Vieux Pin','meta','Carousel',410,2.15,0,'LVP — Masterpiece Traffic','Reach',19070),ad('Masterpiece Gallery — Sales','LaStella','meta','Single image',520,1.84,0,'LAS — Masterpiece Sales','Conversions',28260));
datasets.thrivebox={title:'ThriveBox dashboard',brands:[['all','ThriveBox'],['thrivebox','ThriveBox']],external:'Verified box orders',externalCount:38,summary:'ThriveBox generated 38 sample purchases from a focused Meta campaign.',summaryText:'Short-form UGC video is the strongest creative direction. The next reporting layer will connect verified order data and customer value once the sales platform is confirmed.',sources:[['Meta Ads',38],['Sales platform',38]],segments:[['Parents & caregivers',44],['Teachers & educators',32],['Gift shoppers',24]],ages:[['35–44',39],['25–34',31],['45–54',20],['55+',10]],regions:[['British Columbia',1240,17,72.94,45],['Ontario',980,11,89.09,29],['Alberta',610,6,101.67,16],['Other Canada',390,4,97.50,10]],insights:['UGC-style video is generating the strongest response.','Parents and caregivers account for the largest share of results.','A verified sales connection will allow optimization toward revenue and repeat customers.'],ads:[ad('Winter 2026 — UGC Unboxing','ThriveBox','meta','Video',620,2.71,18,'ThriveBox — Winter 2026','Conversions',22880),ad('What Is Inside ThriveBox?','ThriveBox','meta','Carousel',420,2.11,9,'ThriveBox — Winter 2026','Conversions',19910),ad('Student Reaction','ThriveBox','meta','Video',350,2.49,11,'ThriveBox — Winter 2026','Conversions',14060)]};
datasets.portfolio={title:'Polar Bear portfolio dashboard',brands:[['all','All clients'],['lka','Little Kitchen Academy'],['enotecca','Enotecca'],['thrivebox','ThriveBox']],external:'Verified business results',externalCount:168,summary:'Polar Bear managed 24 sample campaigns across three client groups.',summaryText:'This portfolio view combines paid-media efficiency with verified business outcomes. Open an individual client tab for deeper audience, creative, revenue and campaign-level analysis.',sources:[['Google Ads',144],['Meta Ads',180],['Jumbula',96],['Commerce / sales',72]],segments:[['High-intent prospects',41],['Remarketing audiences',34],['Interest audiences',25]],ages:[['35–44',37],['45–54',26],['25–34',24],['55+',13]],regions:[['British Columbia',9370,128,73.20,40],['Quebec',6730,72,93.47,23],['Ontario',5260,60,87.67,19],['Alberta & other',4740,56,84.64,18]],insights:['Google Search and Performance Max are delivering the strongest efficiency across the portfolio.','Direct benefit-led and UGC creative is outperforming abstract sales messaging.','Business-platform attribution remains essential for separating platform actions from verified registrations and orders.'],ads:[...datasets.lka.ads,...datasets.enotecca.ads,...datasets.thrivebox.ads]};
businessData.thrivebox={platform:'Sales platform',state:'Sales-platform connection pending',locations:['ThriveBox'],daily:null,category:null,age:null,agePlatform:{ThriveBox:[['25–34',9,0],['35–44',15,0],['45–54',8,0],['55+',4,0]]},social:[['Facebook likes','—'],['Instagram follows','—'],['Page engagement','—']],creative:[['Winning direction','UGC unboxing and natural student reactions'],['Top creative','Winter 2026 — UGC Unboxing'],['Next test','Testimonials and product-benefit carousel']],pmax:[['ThriveBox','Meta-only launch view. Add Google Search or Performance Max here when that channel is part of the media plan.']]};
businessData.portfolio={platform:'Business platforms',state:'Jumbula connected · Commerce7 reserved · ThriveBox pending',locations:['LKA','Enotecca','ThriveBox'],daily:null,category:null,age:null,agePlatform:{LKA:[['25–34',2,18],['35–44',20,58],['45–54',3,33],['55+',0,14]],Enotecca:[['25–34',9,13],['35–44',18,28],['45–54',24,35],['55+',24,28]],ThriveBox:[['25–34',9,0],['35–44',15,0],['45–54',8,0],['55+',4,0]]},social:[['Instagram follows',17,'—','—'],['Page engagement',4903,'—','—'],['Verified business results',96,34,38]],creative:[['Portfolio leader','Direct benefits, UGC and video-led creative'],['Needs live images','Enotecca and ThriveBox ad previews'],['Optimization lens','Rank by verified results before CTR']],pmax:[['Cross-client view','Compare efficiency without mixing conversion definitions. Use client tabs for final decisions.'],['Data quality','Jumbula, Commerce7 and the ThriveBox sales source provide the business-outcome layer.']]};
const audienceExtras={
  portfolio:{gender:[['Women',61,'CA$61.40'],['Men',37,'CA$78.20'],['Unknown',2,'—']],languages:[['English',69],['French',23],['Other / unknown',8]],types:[['Prospecting',62,2.03],['Remarketing',38,3.41]],placements:[['Instagram Reels',31],['Google Search',27],['Facebook Feed',22],['Performance Max',20]],devices:[['Mobile',63],['Desktop',30],['Tablet',7]],pacing:[['Little Kitchen Academy',78],['Enotecca',91],['ThriveBox',67]]},
  lka:{gender:[['Women',68,'CA$45.10'],['Men',30,'CA$63.40'],['Unknown',2,'—']],languages:[['English',91],['French',5],['Other',4]],types:[['Prospecting',71,1.96],['Remarketing',29,3.18]],placements:[['Google Search',36],['Instagram Reels',28],['Facebook Feed',21],['Performance Max',15]],devices:[['Mobile',64],['Desktop',27],['Tablet',9]],pacing:[['Fraser',83],['Edgemont',74]]},
  enotecca:{gender:[['Women',54,'CA$72.80'],['Men',44,'CA$80.30'],['Unknown',2,'—']],languages:[['English',72],['French',26],['Other',2]],types:[['Prospecting',58,1.88],['Remarketing',42,3.76]],placements:[['Instagram Feed',29],['Facebook Feed',27],['Google Search',25],['Performance Max',19]],devices:[['Mobile',57],['Desktop',36],['Tablet',7]],pacing:[['LaStella',94],['Le Vieux Pin',87]]},
  thrivebox:{gender:[['Women',73,'CA$32.40'],['Men',25,'CA$46.20'],['Unknown',2,'—']],languages:[['English',96],['French',3],['Other',1]],types:[['Prospecting',76,2.19],['Remarketing',24,4.12]],placements:[['Instagram Reels',43],['Instagram Stories',27],['Facebook Feed',19],['Facebook Stories',11]],devices:[['Mobile',81],['Desktop',17],['Tablet',2]],pacing:[['Winter 2026 campaign',67]]}
};
let client='lka',periodIndex=2;const periods=['Jun 1–30, 2026','Jul 1–31, 2026','Aug 1–31, 2026'],money=n=>'CA$'+Math.round(n).toLocaleString('en-CA'),platformName=p=>p==='meta'?'Meta Ads':'Google Ads';
function bars(items){const m=Math.max(...items.map(x=>x[1]));return items.map(x=>`<div class="bar-item"><div><span>${x[0]}</span><strong>${x[1]}%</strong></div><div class="bar-track"><i style="width:${x[1]/m*100}%"></i></div></div>`).join('')}
function aggregate(ads,key){const map=new Map();ads.forEach(a=>{const label=key==='media'?platformName(a.platform):a[key];const x=map.get(label)||{name:label,brand:key==='media'?'All brands':a.brand,platform:key==='media'?a.platform:'mixed',spend:0,impressions:0,conv:0,weighted:0};x.spend+=a.spend;x.impressions+=a.impressions;x.conv+=a.conv;x.weighted+=a.ctr*a.impressions;map.set(label,x)});return [...map.values()].map(x=>({...x,ctr:x.weighted/x.impressions}))}
function campaignMatches(a){const v=campaignFilter.value;if(v==='all')return true;if(v==='search')return a.format==='Search';if(v==='pmax')return a.format==='PMax';if(v==='reach')return ['Reach','Awareness'].includes(a.objective);return ['Conversions','Sales','Leads'].includes(a.objective)}
function filteredAds(d){const brandMatch=a=>brandFilter.value==='all'||a.brand.toLowerCase().includes(brandFilter.value)||(brandFilter.value==='enotecca'&&['LaStella','Le Vieux Pin'].includes(a.brand));return d.ads.filter(a=>brandMatch(a)&&(platformFilter.value==='all'||a.platform===platformFilter.value)&&campaignMatches(a))}
function thumb(a){const initials=a.brand==='LaStella'?'LAS':a.brand==='Le Vieux Pin'?'LVP':a.brand==='ThriveBox'?'TB':a.brand.includes('Fraser')?'FR':'ED';return `<div class="ad-thumb ${a.platform}" aria-label="Creative preview placeholder"><span>${initials}</span><small>${a.format}</small></div>`}
function renderBreakdown(){const d=datasets[client],mode=breakdownFilter.value,pick=adFilter.value;let base=filteredAds(d);const titles={ads:'Individual ad results',campaign:'Full campaign results',objective:'Performance by objective',media:'Performance by media'};breakdownTitle.textContent=titles[mode];itemFilterLabel.style.display=mode==='ads'?'grid':'none';
  if(mode==='ads'){const rows=base.filter((_,i)=>pick==='all'||String(i)===pick);performanceHead.innerHTML='<tr><th>Preview</th><th>Ad</th><th>Brand</th><th>Platform</th><th>Format</th><th>Spend</th><th>Impressions</th><th>CTR</th><th>Conversions</th><th>Cost / conv.</th></tr>';adRows.innerHTML=rows.map(a=>`<tr><td>${thumb(a)}</td><td>${a.name}</td><td>${a.brand}</td><td><span class="platform-pill ${a.platform}">${platformName(a.platform)}</span></td><td>${a.format}</td><td>${money(a.spend)}</td><td>${a.impressions.toLocaleString()}</td><td>${a.ctr.toFixed(2)}%</td><td>${a.conv}</td><td>${a.conv?'CA$'+(a.spend/a.conv).toFixed(2):'—'}</td></tr>`).join('');return}
  const key=mode==='campaign'?'campaign':mode==='objective'?'objective':'media',rows=aggregate(base,key);performanceHead.innerHTML=`<tr><th>${mode==='campaign'?'Campaign':mode==='objective'?'Objective':'Media'}</th><th>Brand</th><th>Spend</th><th>Impressions</th><th>CTR</th><th>Conversions</th><th>Cost / conv.</th></tr>`;adRows.innerHTML=rows.map(a=>`<tr><td>${a.name}</td><td>${a.brand}</td><td>${money(a.spend)}</td><td>${a.impressions.toLocaleString()}</td><td>${a.ctr.toFixed(2)}%</td><td>${a.conv}</td><td>${a.conv?'CA$'+(a.spend/a.conv).toFixed(2):'—'}</td></tr>`).join('')}
function renderDevices(){const devices=audienceExtras[client].devices;devicePerformance.innerHTML=devices.map(x=>`<div class="device-row"><span>${x[0]}</span><div class="device-bar"><i style="width:${x[1]}%"></i></div><strong>${x[1]}%</strong></div>`).join('')}
function renderSetup(){const setups={portfolio:[['Campaigns in view','24'],['Clients','3'],['Media','Meta · Google'],['Business sources','3'],['Reporting level','Portfolio + client'],['Attribution','Platform + verified']],lka:[['Active campaigns','6'],['Primary objective','Registrations'],['Locations','Fraser · Edgemont'],['Media','Meta · Google'],['Conversion source','Jumbula'],['Attribution','Platform + Jumbula']],enotecca:[['Active campaigns','8'],['Primary objective','Wine Society sales'],['Locations','QC · ON · AB · SK'],['Media','Meta · Google'],['Conversion source','Commerce7 pending'],['Attribution','Platform-only until connected']],thrivebox:[['Active campaigns','1'],['Primary objective','Winter box orders'],['Market','Canada'],['Media','Meta Ads'],['Conversion source','Sales platform'],['Attribution','Pending verification']]};setupSummary.innerHTML=setups[client].map(x=>`<div class="setup-item"><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join('')}
function renderTrend(){const mode=trendBreakdown.value,paths={day:['M0 188 L103 160 L206 177 L309 124 L412 145 L515 92 L618 111 L720 55','M0 203 L103 189 L206 171 L309 181 L412 142 L515 133 L618 97 L720 82'],media:['M0 182 L103 168 L206 135 L309 151 L412 103 L515 116 L618 73 L720 61','M0 204 L103 194 L206 180 L309 161 L412 154 L515 121 L618 132 L720 96'],spend:['M0 196 L103 172 L206 158 L309 143 L412 122 L515 87 L618 69 L720 43','M0 207 L103 201 L206 183 L309 176 L412 151 L515 139 L618 112 L720 101']};trendMain.setAttribute('d',paths[mode][0]);trendSecondary.setAttribute('d',paths[mode][1]);trendArea.setAttribute('d',paths[mode][0]+' L720 218 L0 218 Z');trendTitle.textContent=mode==='day'?'Results per day':mode==='media'?'Daily results by media':'Daily spend trend';legendMain.textContent=mode==='media'?'Meta Ads':mode==='spend'?'Spend':'Conversions';legendSecondary.textContent=mode==='media'?'Google Ads':mode==='spend'?'Previous spend':'Daily trend'}
function renderMetricRibbon(base){const impressions=base.reduce((s,a)=>s+a.impressions,0),clicks=Math.round(base.reduce((s,a)=>s+a.impressions*a.ctr/100,0)),spendValue=base.reduce((s,a)=>s+a.spend,0),results=base.reduce((s,a)=>s+a.conv,0),ctr=impressions?clicks/impressions*100:0;const metrics=[['Impressions',impressions.toLocaleString()],['Reach',Math.round(impressions*.72).toLocaleString()],['Clicks',clicks.toLocaleString()],['CTR',ctr.toFixed(2)+'%'],['Frequency',(impressions/Math.max(impressions*.72,1)).toFixed(2)],['Cost / click',clicks?'CA$'+(spendValue/clicks).toFixed(2):'—']];metricRibbon.innerHTML=metrics.map(x=>`<div><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join('')}
function renderDeepDive(base){const extra=audienceExtras[client],impressions=base.reduce((s,a)=>s+a.impressions,0),clicks=Math.round(base.reduce((s,a)=>s+a.impressions*a.ctr/100,0)),results=base.reduce((s,a)=>s+a.conv,0);const funnel=[['Impressions',impressions],['Clicks',clicks],['Platform results',results],['Verified results',datasets[client].externalCount]];funnelChart.innerHTML=funnel.map((x,i)=>`<div style="width:${100-i*14}%"><span>${x[0]}</span><strong>${x[1]==null?'—':x[1].toLocaleString()}</strong></div>`).join('');budgetPacing.innerHTML=extra.pacing.map(x=>`<div><div><span>${x[0]}</span><strong>${x[1]}%</strong></div><div class="pacing-track"><i class="${x[1]>95?'over':''}" style="width:${Math.min(x[1],100)}%"></i></div><small>${x[1]>95?'Watch overspend':x[1]<75?'Below planned pace':'On track'}</small></div>`).join('');placementPerformance.innerHTML=extra.placements.map((x,i)=>`<div><span><i>${i+1}</i>${x[0]}</span><strong>${x[1]}%</strong></div>`).join('')}
function renderCreativeLeaderboard(base){const top=[...base].sort((a,b)=>b.conv-a.conv||b.ctr-a.ctr).slice(0,3);creativeLeaderboard.innerHTML=top.map((a,i)=>`<article><div class="leaderboard-visual ${a.image?'live-ad ':''}${a.brand.includes('Fraser')?'lka-fr':a.brand.includes('Edgemont')?'lka-ed':a.brand==='LaStella'?'las':a.brand==='Le Vieux Pin'?'lvp':'thrive'}">${a.image?`<img src="${a.image}" alt="${a.name.replaceAll('&','&amp;').replaceAll('"','&quot;')} creative" loading="lazy" referrerpolicy="no-referrer">`:''}<span>#${i+1}</span><small>${a.brand}</small></div><div class="leaderboard-copy"><p>${a.name}</p><div><span>${a.format} · ${platformName(a.platform)}</span><strong>${Number(a.conv.toFixed(2))} results</strong></div><div class="leaderboard-stats"><span>${money(a.spend)} spend</span><span>${a.ctr.toFixed(2)}% CTR</span><span>${a.conv?'CA$'+(a.spend/a.conv).toFixed(2)+' CPR':'No conversion'}</span></div></div></article>`).join('')||'<div class="connection-empty">No ads match the selected filters.</div>'}
function renderCampaignHealth(base){const campaigns=aggregate(base,'campaign').sort((a,b)=>b.spend-a.spend);campaignHealthRows.innerHTML=campaigns.map((a,i)=>{const paused=a.conv===0,status=paused?'Paused':'Active',pace=[82,91,74,98,68][i%5],recommendation=paused?'Use for traffic/awareness; replace in conversion campaigns':a.ctr>2.5?'Scale carefully and protect efficiency':a.conv>15?'Refresh creative while maintaining delivery':'Monitor and test a stronger benefit-led message';return `<tr><td>${a.name}</td><td>${a.brand}</td><td><span class="status-pill ${paused?'paused':''}">${status}</span></td><td>${base.find(x=>x.campaign===a.name)?.objective||'Mixed'}</td><td>${money(a.spend)}</td><td>${a.conv}</td><td>${a.conv?'CA$'+(a.spend/a.conv).toFixed(2):'—'}</td><td>${pace}%</td><td class="recommendation-cell">${recommendation}</td></tr>`}).join('')}
function renderDemographicExtras(){const extra=audienceExtras[client];genderPerformance.innerHTML=extra.gender.map(x=>`<div><span>${x[0]}</span><strong>${x[1]}%</strong><small>${x[2]} cost / result</small></div>`).join('');languagePerformance.innerHTML=bars(extra.languages);audienceTypePerformance.innerHTML=extra.types.map(x=>`<div><small>${x[0]}</small><strong>${x[1]}%</strong><span>${x[2].toFixed(2)}% CTR</span></div>`).join('')}
function renderBusiness(){
  const b=businessData[client],view=commerceView.value;
  commerceTitle.textContent=client==='portfolio'?'Business-result connections':b.platform+(client==='lka'?' registration results':' sales results');
  commerceState.textContent=b.state;commerceState.classList.toggle('pending',!b[view]);commerceEyebrow.textContent=b.platform.toUpperCase()+' REVENUE';
  commerceDetailTitle.textContent=view==='day'?'Revenue by day':view==='category'?(client==='lka'?'Revenue by program':'Revenue by product'):'Revenue by age group';
  const totals=b.daily?b.locations.map(l=>b.daily[l].reduce((s,x)=>s+x[1],0)):[];
  commerceKpis.innerHTML=b.daily?[['Total revenue',totals.reduce((a,x)=>a+x,0)],['Strongest location',b.locations[totals.indexOf(Math.max(...totals))]],['Top category',b.category[b.locations[totals.indexOf(Math.max(...totals))]][0][0]],['Sales source',b.platform]].map(x=>`<div><small>${x[0]}</small><strong>${typeof x[1]==='number'?'CA$'+x[1].toLocaleString('en-CA',{minimumFractionDigits:2,maximumFractionDigits:2}):x[1]}</strong></div>`).join(''):[['Jumbula','LKA ready'],['Commerce7','Enotecca reserved'],['ThriveBox','Sales source pending'],['Attribution','Platform + verified']].map(x=>`<div><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join('');
  if(!b[view])commerceContent.innerHTML=`<div class="connection-empty"><span>${client==='enotecca'?'C7':'↗'}</span><div><strong>${client==='enotecca'?'Commerce7 section ready':'Business-results section ready'}</strong><p>Once connected, this area will populate revenue by date, product or program, customer segment and order value without changing the layout.</p></div></div>`;
  else commerceContent.innerHTML=b.locations.map(l=>{const rows=b[view][l],total=rows.reduce((s,x)=>s+x[1],0),max=Math.max(...rows.map(x=>x[1]),1);return `<div class="commerce-location"><h3>${l}</h3>${rows.map(x=>`<div class="revenue-row"><span>${x[0]}</span><div><i style="width:${x[1]/max*100}%"></i></div><strong>CA$${x[1].toLocaleString('en-CA',{minimumFractionDigits:2})}</strong></div>`).join('')}<div class="revenue-total"><span>Total</span><strong>CA$${total.toLocaleString('en-CA',{minimumFractionDigits:2})}</strong></div></div>`}).join('');
  agePlatform.innerHTML=b.locations.map(l=>`<div class="age-location"><h3>${l}</h3>${b.agePlatform[l].map(x=>`<div class="dual-row"><span>${x[0]}</span><div><i class="meta-bar" style="width:${x[1]/58*100}%"></i><i class="google-bar" style="width:${x[2]/58*100}%"></i></div><small>${x[1]} / ${x[2]}</small></div>`).join('')}</div>`).join('');
  socialHead.innerHTML=`<tr><th>Social action</th>${b.locations.map(x=>`<th>${x}</th>`).join('')}</tr>`;
  socialRows.innerHTML=b.social.map(x=>`<tr><td>${x[0]}</td>${x.slice(1).map(v=>`<td>${typeof v==='number'?v.toLocaleString():v}</td>`).join('')}</tr>`).join('');
  socialInsight.textContent=client==='lka'?'Paid campaigns generated strong engagement across both locations. Treat engagement as a supporting indicator while optimizing toward registrations and cost per purchase.':client==='portfolio'?'Use engagement as context, then prioritize verified registrations, subscriptions and purchases for final optimization decisions.':'Social growth, engagement and verified sales will appear here once live sources are connected.';
  creativeInsight.innerHTML=client==='lka'?`<div class="winning-ads"><article><div class="ad-crop edgemont" role="img" aria-label="Best-performing Edgemont video ad"></div><div><span>Edgemont</span><strong>2 purchases</strong></div></article><article><div class="ad-crop fraser" role="img" aria-label="Best-performing Fraser video ad"></div><div><span>Fraser</span><strong>7 purchases</strong></div></article></div><div class="quality-row"><span>Meta quality ranking</span><strong>Average</strong></div>`:`<div class="creative-empty"><span>${b.creative[0][0]}</span><strong>${b.creative[0][1]}</strong><small>${b.creative[1][1]}</small></div>`;
  pmaxInsights.innerHTML=b.pmax.map(x=>`<div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('');
}
function render(){
  const d=datasets[client];dashboardTitle.textContent=d.title;summaryTitle.textContent=d.summary;summaryText.textContent=d.summaryText;externalLabel.textContent=d.external;externalConversions.textContent=d.externalCount==null?'—':d.externalCount;externalStatus.textContent=d.externalCount==null?'Connection pending':'External platform';
  const old=brandFilter.value;brandFilter.innerHTML=d.brands.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');if([...brandFilter.options].some(o=>o.value===old))brandFilter.value=old;
  const base=filteredAds(d),s=base.reduce((x,a)=>x+a.spend,0),c=base.reduce((x,a)=>x+a.conv,0);
  spend.textContent=money(s);conversions.textContent=c;cpa.textContent=c?'CA$'+(s/c).toFixed(2):'—';
  sourceStack.innerHTML=d.sources.map((x,i)=>`<div class="source-row"><span><i style="background:${['#ff9925','#565656','#a9a9a9','#d7d7d7'][i%4]}"></i>${x[0]}</span><strong>${x[1]==null?'—':x[1]}</strong><small>${x[1]==null?'connection pending':x[0].includes('Jumbula')||x[0].includes('sales')?'verified results':'platform results'}</small></div>`).join('');
  adFilter.innerHTML='<option value="all">All ads</option>'+base.map((a,i)=>`<option value="${i}">${a.name} — ${a.brand}</option>`).join('');
  renderMetricRibbon(base);renderBreakdown();renderDevices();renderSetup();renderTrend();renderDeepDive(base);renderCreativeLeaderboard(base);renderCampaignHealth(base);renderDemographicExtras();renderBusiness();
  segments.innerHTML=bars(d.segments);demographics.innerHTML=bars(d.ages);regionRows.innerHTML=d.regions.map(r=>`<tr><td>${r[0]}</td><td>${money(r[1])}</td><td>${r[2]}</td><td>CA$${r[3].toFixed(2)}</td><td>${r[4]}%</td></tr>`).join('');insightList.innerHTML=d.insights.map(x=>`<li>${x}</li>`).join('');comments.value=localStorage.getItem('comments-'+client)||'';
}
document.querySelectorAll('.client-tab').forEach(b=>b.onclick=()=>{client=b.dataset.client;document.querySelectorAll('.client-tab').forEach(x=>x.classList.toggle('active',x===b));brandFilter.value='all';if(client==='thrivebox')platformFilter.value='meta';render();renderLiveGoogleTrend();renderGoogleIntegrationForClient();maybeLoadGooglePerformance();maybeLoadMetaPerformance()});
[brandFilter,platformFilter,campaignFilter,metricFilter].forEach(x=>x.onchange=()=>{render();renderLiveGoogleTrend()});breakdownFilter.onchange=renderBreakdown;trendBreakdown.onchange=()=>{renderTrend();renderLiveGoogleTrend()};commerceView.onchange=renderBusiness;adFilter.onchange=renderBreakdown;
function localDateValue(date){const offset=date.getTimezoneOffset()*60000;return new Date(date-offset).toISOString().slice(0,10)}
function validateDateRange(){const valid=Boolean(startDate.value&&endDate.value&&startDate.value<=endDate.value);dateRangeError.textContent=valid?'':'Choose an end date on or after the start date.';applyDates.disabled=!valid;return valid}
datePreset.onchange=()=>{if(datePreset.value==='custom')return;const end=new Date(),start=new Date(end);if(datePreset.value==='mtd')start.setDate(1);else if(datePreset.value==='previous'){start.setMonth(start.getMonth()-1,1);end.setDate(0)}else start.setDate(end.getDate()-Number(datePreset.value)+1);startDate.value=localDateValue(start);endDate.value=localDateValue(end);validateDateRange()};
[startDate,endDate].forEach(input=>input.onchange=()=>{datePreset.value='custom';validateDateRange()});
applyDates.onclick=()=>{if(!validateDateRange())return;periodLabel.textContent=new Date(startDate.value+'T12:00:00').toLocaleDateString('en-CA',{month:'short',day:'numeric'})+'–'+new Date(endDate.value+'T12:00:00').toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric'});render();maybeLoadGooglePerformance(true);maybeLoadMetaPerformance(true)};
resetFilters.onclick=()=>{platformFilter.value=campaignFilter.value=brandFilter.value='all';metricFilter.value='results';render()};saveComments.onclick=()=>{localStorage.setItem('comments-'+client,comments.value);saveState.textContent='Saved just now'};previousPeriod.onclick=()=>{periodIndex=Math.max(0,periodIndex-1);periodLabel.textContent=periods[periodIndex]};nextPeriod.onclick=()=>{periodIndex=Math.min(2,periodIndex+1);periodLabel.textContent=periods[periodIndex]};render();

const GOOGLE_CONNECTOR='https://pb-ads-google-connector-r6hihlwcra-uc.a.run.app';
const GOOGLE_CONNECTOR_ORIGIN=new URL(GOOGLE_CONNECTOR).origin;
const GOOGLE_SESSION_KEY='pb-google-ads-session';
const GOOGLE_ACCOUNT_MAP={lka:{id:'7928636633',name:'LKA – North Vancouver'},enotecca:{id:'1099466129',name:'Enotecca Winery & Resorts'}};
let googleSession=localStorage.getItem(GOOGLE_SESSION_KEY)||sessionStorage.getItem(GOOGLE_SESSION_KEY)||'';
if(googleSession)localStorage.setItem(GOOGLE_SESSION_KEY,googleSession);
const googleLiveState={lka:null,enotecca:null};
const googleLiveLoading=new Set();
let googleAccessibleIds=[];

function setGoogleConnectionState(state,detail){
  googleConnectionStatus.textContent=state;
  googleConnectionDetail.textContent=detail;
  googleConnectionStatus.classList.toggle('connected',state==='Connected');
  connectGoogleAds.textContent=state==='Connected'?'Reconnect Google Ads':'Connect Google Ads';
}

function accountCard(target){
  const account=GOOGLE_ACCOUNT_MAP[target],displayId=account.id.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3');
  return `<article><div><strong>${account.name}</strong><span>${displayId}</span></div><div class="google-account-meta"><span>Mapped client account</span><span>Google Ads</span></div></article>`;
}

function renderGoogleIntegrationForClient(){
  const supported=client==='portfolio'||Boolean(GOOGLE_ACCOUNT_MAP[client]);
  googleIntegration.hidden=!supported;
  if(!supported)return;
  googleAccountPanel.hidden=!googleSession;
  if(!googleSession)return;
  const targets=client==='portfolio'?['lka','enotecca']:[client];
  googleClientList.innerHTML=targets.map(accountCard).join('');
  googleAccountResult.textContent=client==='portfolio'?'2 Google Ads accounts mapped to the Polar Bear portfolio.':'Mapped to the client currently displayed.';
  if(client!=='portfolio'&&GOOGLE_ACCOUNT_MAP[client])googleManagerSelect.value=GOOGLE_ACCOUNT_MAP[client].id;
  const loaded=targets.map(target=>({target,live:googleLiveState[target]})).filter(item=>item.live);
  if(loaded.length===targets.length){
    const detail=loaded.map(({target,live})=>`${GOOGLE_ACCOUNT_MAP[target].name}: ${live.ads.length} campaigns · ${money(live.totals.spend)} spend · ${live.totals.conversions.toFixed(2)} conversions`).join(' | ');
    setGoogleConnectionState('Connected',detail);
  }
}

function googleAuthHeaders(){return googleSession?{Authorization:`Bearer ${googleSession}`}:{}}

function googleRows(data){return (Array.isArray(data)?data:[data]).flatMap(batch=>batch?.results||[])}
function channelLabel(value){return {SEARCH:'Search',PERFORMANCE_MAX:'PMax',DISPLAY:'Display',VIDEO:'Video',SHOPPING:'Shopping',DISCOVERY:'Demand Gen'}[value]||String(value||'Other').replaceAll('_',' ')}
function liveBrand(target){return target==='lka'?'LKA – North Vancouver':'Enotecca Winery & Resorts'}

function normalizeGooglePerformance(target,data){
  const rows=googleRows(data),campaigns=new Map(),daily=new Map();
  rows.forEach(row=>{
    const campaign=row.campaign||{},metrics=row.metrics||{},date=row.segments?.date||'',impressions=Number(metrics.impressions||0),clicks=Number(metrics.clicks||0),spend=Number(metrics.costMicros||0)/1e6,conversions=Number(metrics.conversions||0),key=String(campaign.id||campaign.name||'unknown');
    const current=campaigns.get(key)||{name:campaign.name||`Campaign ${key}`,brand:liveBrand(target),platform:'google',format:channelLabel(campaign.advertisingChannelType),spend:0,ctr:0,conv:0,campaign:campaign.name||`Campaign ${key}`,objective:'Conversions',impressions:0,clicks:0,status:campaign.status||'UNKNOWN',live:true};
    current.spend+=spend;current.conv+=conversions;current.impressions+=impressions;current.clicks+=clicks;campaigns.set(key,current);
    if(date){const day=daily.get(date)||{date,spend:0,conversions:0,impressions:0,clicks:0};day.spend+=spend;day.conversions+=conversions;day.impressions+=impressions;day.clicks+=clicks;daily.set(date,day)}
  });
  const ads=[...campaigns.values()].map(item=>({...item,ctr:item.impressions?item.clicks/item.impressions*100:0}));
  return {ads,daily:[...daily.values()].sort((a,b)=>a.date.localeCompare(b.date)),totals:{spend:ads.reduce((s,a)=>s+a.spend,0),conversions:ads.reduce((s,a)=>s+a.conv,0),impressions:ads.reduce((s,a)=>s+a.impressions,0),clicks:ads.reduce((s,a)=>s+a.clicks,0)}};
}

function syncGoogleDataset(target,live){
  datasets[target].ads=[...datasets[target].ads.filter(item=>item.platform!=='google'),...live.ads];
  const source=datasets[target].sources.find(item=>item[0]==='Google Ads');if(source)source[1]=Math.round(live.totals.conversions*100)/100;
  datasets.portfolio.ads=[...datasets.lka.ads,...datasets.enotecca.ads,...datasets.thrivebox.ads];
  const portfolioGoogle=datasets.portfolio.sources.find(item=>item[0]==='Google Ads');if(portfolioGoogle)portfolioGoogle[1]=['lka','enotecca'].reduce((sum,key)=>sum+(googleLiveState[key]?.totals.conversions||0),0);
}

function liveDailyForView(){
  const source=client==='portfolio'?['lka','enotecca'].flatMap(key=>googleLiveState[key]?.daily||[]):googleLiveState[client]?.daily||[],map=new Map();
  source.forEach(day=>{const current=map.get(day.date)||{date:day.date,spend:0,conversions:0};current.spend+=day.spend;current.conversions+=day.conversions;map.set(day.date,current)});
  return [...map.values()].sort((a,b)=>a.date.localeCompare(b.date));
}

function livePath(values){
  if(!values.length)return '';const max=Math.max(...values,1),step=values.length===1?0:720/(values.length-1);
  return values.map((value,index)=>`${index?'L':'M'}${values.length===1?360:index*step} ${210-(value/max)*165}`).join(' ');
}

function renderLiveGoogleTrend(){
  const daily=liveDailyForView();if(!daily.length||trendBreakdown.value!=='day')return;
  const conversions=livePath(daily.map(day=>day.conversions)),spendPath=livePath(daily.map(day=>day.spend));trendMain.setAttribute('d',conversions);trendSecondary.setAttribute('d',spendPath);trendArea.setAttribute('d',conversions+' L720 218 L0 218 Z');trendTitle.textContent='Live Google Ads results per day';legendMain.textContent='Conversions';legendSecondary.textContent='Spend trend';
  const indexes=[0,.25,.5,.75,1].map(ratio=>Math.round((daily.length-1)*ratio)),labels=indexes.map(index=>new Date(daily[index].date+'T12:00:00').toLocaleDateString('en-CA',{month:'short',day:'numeric'}));document.querySelector('.x-labels').innerHTML=labels.map(label=>`<span>${label}</span>`).join('');
}

async function loadGooglePerformance(target,{force=false}={}){
  const account=GOOGLE_ACCOUNT_MAP[target];if(!googleSession||!account||googleLiveLoading.has(target)||googleLiveState[target]&&!force)return;
  googleLiveLoading.add(target);setGoogleConnectionState('Loading live data…',`Retrieving ${account.name} for ${startDate.value} to ${endDate.value}.`);
  try{
    const params=new URLSearchParams({loginCustomerId:account.id,customerId:account.id,startDate:startDate.value,endDate:endDate.value}),response=await fetch(`${GOOGLE_CONNECTOR}/api/google-ads/performance?${params}`,{headers:googleAuthHeaders()}),data=await response.json();
    if(!response.ok)throw new Error(data.error||`Google Ads performance could not be loaded for ${account.name}.`);
    const live=normalizeGooglePerformance(target,data);googleLiveState[target]=live;syncGoogleDataset(target,live);
    if(client===target||client==='portfolio'){render();renderLiveGoogleTrend();renderGoogleIntegrationForClient()}
    document.querySelector('.notice strong').textContent='Google Ads live';document.querySelector('.notice span').textContent='Google campaign metrics are live for the selected dates. Meta and business-platform sections remain in preview until connected.';
    setGoogleConnectionState('Connected',`${account.name}: ${live.ads.length} campaigns · ${money(live.totals.spend)} spend · ${live.totals.conversions.toFixed(2)} conversions.`);
  }catch(error){setGoogleConnectionState('Connected',`${account.name} is mapped, but live performance returned: ${error.message}`)}finally{googleLiveLoading.delete(target)}
}

async function maybeLoadGooglePerformance(force=false){
  if(!googleSession)return;const targets=client==='portfolio'?['lka','enotecca']:[client];
  await Promise.all(targets.filter(target=>GOOGLE_ACCOUNT_MAP[target]).map(target=>loadGooglePerformance(target,{force})));
  if(client==='portfolio'&&googleLiveState.lka&&googleLiveState.enotecca){render();renderLiveGoogleTrend();setGoogleConnectionState('Connected',`Live Google data loaded: ${GOOGLE_ACCOUNT_MAP.lka.name} and ${GOOGLE_ACCOUNT_MAP.enotecca.name}.`)}
}

async function discoverGoogleCustomers(){
  if(!googleSession)return;
  setGoogleConnectionState('Checking access…','Verifying the Google Ads accounts available to this Polar Bear login.');
  try{
    const response=await fetch(`${GOOGLE_CONNECTOR}/api/google-ads/accessible-customers`,{headers:googleAuthHeaders()});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'Google Ads access could not be verified.');
    const ids=(data.resourceNames||[]).map(name=>String(name).replace('customers/',''));googleAccessibleIds=ids;
    googleManagerSelect.innerHTML='<option value="">Select an account</option>'+ids.map(id=>`<option value="${id}">${id.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')}</option>`).join('');
    googleAccountPanel.hidden=false;
    renderGoogleIntegrationForClient();
    setGoogleConnectionState('Connected',ids.length?'Google authorization is active. Loading mapped account performance…':'Authorization is active, but this Google login returned no Ads accounts.');
    maybeLoadGooglePerformance();
  }catch(error){
    sessionStorage.removeItem(GOOGLE_SESSION_KEY);localStorage.removeItem(GOOGLE_SESSION_KEY);googleSession='';googleAccountPanel.hidden=true;
    setGoogleConnectionState('Reconnect required',error.message);
  }
}

connectGoogleAds.onclick=()=>{
  const popup=window.open(`${GOOGLE_CONNECTOR}/auth/google/start`,'pbGoogleAds','popup=yes,width=620,height=760');
  if(!popup)setGoogleConnectionState('Popup blocked','Allow popups for this dashboard, then try connecting again.');
};

window.addEventListener('message',event=>{
  if(event.origin!==GOOGLE_CONNECTOR_ORIGIN||event.data?.type!=='google-ads-connected'||!event.data?.token)return;
  googleSession=event.data.token;sessionStorage.setItem(GOOGLE_SESSION_KEY,googleSession);localStorage.setItem(GOOGLE_SESSION_KEY,googleSession);
  setGoogleConnectionState('Connected',`Authorized as ${event.data.email}. Discovering accessible accounts…`);
  discoverGoogleCustomers();
});

loadGoogleAccounts.onclick=async()=>{
  const loginCustomerId=googleManagerSelect.value;
  if(!loginCustomerId){googleAccountResult.textContent='Select the manager account first.';return}
  googleAccountResult.textContent='Loading linked accounts…';
  try{
    const response=await fetch(`${GOOGLE_CONNECTOR}/api/google-ads/accounts?loginCustomerId=${encodeURIComponent(loginCustomerId)}`,{headers:googleAuthHeaders()});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'Linked accounts could not be loaded.');
    const rows=Array.isArray(data)?data.flatMap(batch=>batch.results||[]):data.results||[];
    const accounts=rows.map(row=>row.customerClient).filter(Boolean),clients=accounts.filter(account=>!account.manager);
    googleClientList.innerHTML=accounts.map(account=>{const rawId=String(account.clientCustomer||'').replace('customers/',''),displayId=rawId.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3'),name=account.descriptiveName||'Unnamed Google Ads account',kind=account.manager?'Manager account':'Client account';return `<article><div><strong>${name}</strong><span>${displayId||'ID unavailable'}</span></div><div class="google-account-meta"><span>${kind}</span><span>${account.status||'Status unavailable'}</span><span>${account.currencyCode||'Currency unavailable'}</span><span>${account.timeZone||''}</span></div></article>`}).join('');
    googleAccountResult.textContent=clients.length?`${clients.length} client account${clients.length===1?'':'s'} ready to map into the dashboard.`:'The selected account did not return client accounts. Try another accessible account.';
  }catch(error){googleAccountResult.textContent=error.message}
};

googleManagerSelect.onchange=()=>{
  googleClientList.innerHTML='';
  googleAccountResult.textContent=googleManagerSelect.value?'Click “Load linked accounts” to inspect this account.':'Select an account to inspect it.';
};

const META_ACCOUNT_MAP={
  lka:[{id:'1462400408056476',brand:'LKA Fraser'},{id:'4250540271898801',brand:'LKA Edgemont'}],
  enotecca:[{id:'913601552530100',brand:'LaStella'},{id:'2880495615400590',brand:'Le Vieux Pin'}]
};
const metaLiveState={lka:null,enotecca:null};
const metaLiveLoading=new Set();

function metaActionValue(actions,types){
  const rows=Array.isArray(actions)?actions:[];
  for(const type of types){const match=rows.find(item=>item.action_type===type);if(match)return Number(match.value||0)}
  return 0;
}
function metaResults(row){return metaActionValue(row.actions,['offsite_conversion.fb_pixel_purchase','omni_purchase','purchase','offsite_conversion.fb_pixel_subscribe','subscribe','complete_registration','offsite_conversion.fb_pixel_lead','lead'])}
function metaRevenue(row){return metaActionValue(row.action_values,['offsite_conversion.fb_pixel_purchase','omni_purchase','purchase','offsite_conversion.fb_pixel_subscribe','subscribe'])}
function metaCreativeImage(creative){const spec=creative?.object_story_spec||{};return creative?.image_url||creative?.thumbnail_url||spec?.video_data?.image_url||spec?.link_data?.picture||spec?.link_data?.child_attachments?.[0]?.picture||''}
function metaCreativeFormat(creative){const spec=creative?.object_story_spec||{};if(spec.video_data)return 'Video';if((spec.link_data?.child_attachments||[]).length>1)return 'Carousel';return 'Single image'}

function normalizeMetaAccount(account,payload){
  const metadata=new Map((payload.ads||[]).map(item=>[String(item.id),item])),byAd=new Map(),daily=new Map();
  (payload.insights||[]).forEach(row=>{
    const key=String(row.ad_id||row.ad_name||'unknown'),meta=metadata.get(key)||{},campaign=meta.campaign||{},current=byAd.get(key)||{id:key,name:row.ad_name||meta.name||`Ad ${key}`,brand:account.brand,platform:'meta',format:metaCreativeFormat(meta.creative),spend:0,ctr:0,conv:0,revenue:0,campaign:row.campaign_name||campaign.name||'Meta campaign',objective:row.objective||campaign.objective||'Results',impressions:0,clicks:0,status:meta.effective_status||meta.status||'UNKNOWN',image:metaCreativeImage(meta.creative),live:true};
    current.spend+=Number(row.spend||0);current.conv+=metaResults(row);current.revenue+=metaRevenue(row);current.impressions+=Number(row.impressions||0);current.clicks+=Number(row.inline_link_clicks||row.clicks||0);byAd.set(key,current);
    const date=row.date_start;if(date){const day=daily.get(date)||{date,spend:0,conversions:0,impressions:0,clicks:0};day.spend+=Number(row.spend||0);day.conversions+=metaResults(row);day.impressions+=Number(row.impressions||0);day.clicks+=Number(row.inline_link_clicks||row.clicks||0);daily.set(date,day)}
  });
  const ads=[...byAd.values()].map(item=>({...item,ctr:item.impressions?item.clicks/item.impressions*100:0}));
  return {ads,daily:[...daily.values()].sort((a,b)=>a.date.localeCompare(b.date)),devices:payload.devices||[],demographics:payload.demographics||[],regions:payload.regions||[],totals:{spend:ads.reduce((s,a)=>s+a.spend,0),conversions:ads.reduce((s,a)=>s+a.conv,0),revenue:ads.reduce((s,a)=>s+a.revenue,0),impressions:ads.reduce((s,a)=>s+a.impressions,0),clicks:ads.reduce((s,a)=>s+a.clicks,0)}};
}
function combineMetaResults(results){
  const combined={ads:[],daily:[],devices:[],demographics:[],regions:[],totals:{spend:0,conversions:0,revenue:0,impressions:0,clicks:0},dailyMap:new Map()};
  results.forEach(result=>{combined.ads.push(...result.ads);combined.devices.push(...result.devices);combined.demographics.push(...result.demographics);combined.regions.push(...result.regions);Object.keys(combined.totals).forEach(key=>combined.totals[key]+=result.totals[key]||0);result.daily.forEach(day=>{const current=combined.dailyMap.get(day.date)||{date:day.date,spend:0,conversions:0,impressions:0,clicks:0};Object.keys(current).filter(key=>key!=='date').forEach(key=>current[key]+=day[key]||0);combined.dailyMap.set(day.date,current)})});
  combined.daily=[...combined.dailyMap.values()].sort((a,b)=>a.date.localeCompare(b.date));delete combined.dailyMap;return combined;
}
function metaBreakdownResults(row){return metaResults(row)}
function syncMetaAudiences(target,live){
  const deviceTotals=new Map();live.devices.forEach(row=>{const key=String(row.impression_device||'Other').replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase()),value=Number(row.impressions||0);deviceTotals.set(key,(deviceTotals.get(key)||0)+value)});const deviceAll=[...deviceTotals.values()].reduce((s,x)=>s+x,0)||1;audienceExtras[target].devices=[...deviceTotals.entries()].sort((a,b)=>b[1]-a[1]).map(([name,value])=>[name,Math.round(value/deviceAll*100)]);
  const ageTotals=new Map(),genderTotals=new Map();live.demographics.forEach(row=>{const results=metaBreakdownResults(row),age=row.age||'Unknown',gender=String(row.gender||'unknown').replace(/^./,c=>c.toUpperCase());ageTotals.set(age,(ageTotals.get(age)||0)+results);const current=genderTotals.get(gender)||{results:0,spend:0};current.results+=results;current.spend+=Number(row.spend||0);genderTotals.set(gender,current)});const ageAll=[...ageTotals.values()].reduce((s,x)=>s+x,0)||1;datasets[target].ages=[...ageTotals.entries()].sort((a,b)=>b[1]-a[1]).map(([name,value])=>[name,Math.round(value/ageAll*100)]);const genderAll=[...genderTotals.values()].reduce((s,x)=>s+x.results,0)||1;audienceExtras[target].gender=[...genderTotals.entries()].sort((a,b)=>b[1].results-a[1].results).map(([name,value])=>[name,Math.round(value.results/genderAll*100),value.results?'CA$'+(value.spend/value.results).toFixed(2):'—']);
  const regionTotals=new Map();live.regions.forEach(row=>{const name=row.region||'Unknown',current=regionTotals.get(name)||{spend:0,results:0};current.spend+=Number(row.spend||0);current.results+=metaBreakdownResults(row);regionTotals.set(name,current)});const regionAll=[...regionTotals.values()].reduce((s,x)=>s+x.results,0)||1;datasets[target].regions=[...regionTotals.entries()].sort((a,b)=>b[1].results-a[1].results).slice(0,12).map(([name,value])=>[name,value.spend,value.results,value.results?value.spend/value.results:0,Math.round(value.results/regionAll*100)]);
}
function syncMetaDataset(target,live){
  datasets[target].ads=[...datasets[target].ads.filter(item=>item.platform!=='meta'),...live.ads];const source=datasets[target].sources.find(item=>item[0]==='Meta Ads');if(source)source[1]=Math.round(live.totals.conversions*100)/100;syncMetaAudiences(target,live);const googleConversions=googleLiveState[target]?.totals.conversions||0,totalResults=live.totals.conversions+googleConversions;datasets[target].summary=`${Number(totalResults.toFixed(2))} tracked conversion events in the selected reporting period.`;datasets[target].summaryText=target==='enotecca'?'Live results across LaStella and Le Vieux Pin. Meta conversions include tracked purchases or subscriptions; landing-page views are reported separately and are not counted as conversions.':'Live results across Fraser and Edgemont. Meta conversions include tracked purchases, registrations or leads; landing-page views are not counted as conversions.';datasets.portfolio.ads=[...datasets.lka.ads,...datasets.enotecca.ads,...datasets.thrivebox.ads];const portfolioMeta=datasets.portfolio.sources.find(item=>item[0]==='Meta Ads');if(portfolioMeta)portfolioMeta[1]=['lka','enotecca'].reduce((sum,key)=>sum+(metaLiveState[key]?.totals.conversions||0),0)
}
async function loadMetaPerformance(target,{force=false}={}){
  const accounts=META_ACCOUNT_MAP[target];if(!googleSession||!accounts||metaLiveLoading.has(target)||metaLiveState[target]&&!force)return;metaLiveLoading.add(target);document.querySelector('.notice strong').textContent='Loading Meta Ads…';document.querySelector('.notice span').textContent=`Retrieving live campaigns, ads, creatives and audience breakdowns for ${target==='lka'?'Little Kitchen Academy':'Enotecca'}.`;
  try{const results=await Promise.all(accounts.map(async account=>{const params=new URLSearchParams({accountId:account.id,startDate:startDate.value,endDate:endDate.value}),response=await fetch(`${GOOGLE_CONNECTOR}/api/meta-ads/performance?${params}`,{headers:googleAuthHeaders()}),data=await response.json();if(!response.ok)throw new Error(data.error||`Meta data could not be loaded for ${account.brand}.`);return normalizeMetaAccount(account,data)}));const live=combineMetaResults(results);metaLiveState[target]=live;syncMetaDataset(target,live);if(client===target||client==='portfolio')render();document.querySelector('.notice strong').textContent='Google + Meta Ads live';document.querySelector('.notice span').textContent='Campaign, ad, creative and audience metrics are live for the selected dates. Landing-page views are excluded from the conversion total.';dashboardMode.textContent='Live dashboard';dashboardSources.textContent='Google + Meta data';
  }catch(error){document.querySelector('.notice strong').textContent='Meta connection needs attention';document.querySelector('.notice span').textContent=error.message}finally{metaLiveLoading.delete(target)}
}
async function maybeLoadMetaPerformance(force=false){if(!googleSession||client==='thrivebox')return;const targets=client==='portfolio'?['lka','enotecca']:[client];await Promise.all(targets.filter(target=>META_ACCOUNT_MAP[target]).map(target=>loadMetaPerformance(target,{force})))}

if(startDate.value==='2026-08-01'&&endDate.value==='2026-08-31'){const end=new Date(),start=new Date(end);start.setDate(end.getDate()-29);startDate.value=localDateValue(start);endDate.value=localDateValue(end);datePreset.value='30';periodLabel.textContent=start.toLocaleDateString('en-CA',{month:'short',day:'numeric'})+'–'+end.toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric'})}
validateDateRange();renderGoogleIntegrationForClient();
if(googleSession){discoverGoogleCustomers();maybeLoadMetaPerformance()}
