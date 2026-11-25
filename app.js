const tools = [
  {id:"pgp",title:"Verify a PGP message",category:"Security",icon:"✉",desc:"Check an OpenPGP signature with its public key.",note:"Armored signed messages or detached signatures are supported. For a detached signature, paste the original text above. The OpenPGP library loads from jsDelivr when needed.",fields:[{name:"message",label:"Signed message",type:"textarea",placeholder:"-----BEGIN PGP SIGNED MESSAGE-----"},{name:"signature",label:"Detached signature (optional)",type:"textarea",placeholder:"Paste a detached signature, or leave empty for a clear-signed message"},{name:"publicKey",label:"Public key",type:"textarea",placeholder:"-----BEGIN PGP PUBLIC KEY BLOCK-----"}]},
  {id:"encrypt",title:"Encrypt / decrypt",category:"Security",icon:"⌑",desc:"Encrypt text with a key using AES and Web Crypto.",note:"AES-GCM is authenticated and recommended. CBC and CTR are provided for compatibility; they do not authenticate data.",fields:[{name:"action",label:"Action",type:"select",options:["Encrypt","Decrypt"]},{name:"mode",label:"AES mode",type:"select",options:["GCM","CBC","CTR"]},{name:"key",label:"Passphrase / key",type:"password",placeholder:"Use a strong passphrase"},{name:"data",label:"Text or encrypted payload",type:"textarea",placeholder:"Enter text to encrypt or a DF1 payload to decrypt"}]},
  {id:"php-hash",title:"PHP password hash creator",category:"Security",icon:"✳",desc:"Create PHP-compatible bcrypt or Argon2id hashes.",note:"Needs an internet connection to load browser-only hashing libraries. Passwords are never uploaded.",fields:[{name:"password",label:"Password",type:"password",placeholder:"Enter a password"},{name:"algorithm",label:"Algorithm",type:"select",options:["bcrypt","Argon2id"]},{name:"cost",label:"bcrypt cost (4–16)",type:"number",value:"10"}]},
  {id:"php-verify",title:"Verify PHP password hash",category:"Security",icon:"✓",desc:"Check a password against a PHP bcrypt or Argon2id hash.",note:"Needs an internet connection to load browser-only hashing libraries. Passwords and hashes stay in this tab.",fields:[{name:"password",label:"Password",type:"password",placeholder:"Password to verify"},{name:"hash",label:"PHP password hash",type:"text",placeholder:"$2y$... or $argon2id$..."}]},
  {id:"gitignore",title:".gitignore generator",category:"Developer",icon:"⌘",desc:"Build a starter ignore file for common languages and tools.",fields:[{name:"presets",label:"Choose presets",type:"checks",options:["Node","Python","PHP","Java","Rust","Go","Windows","macOS","Linux","Visual Studio Code","JetBrains","Environment files"]}]},
  {id:"obfuscate",title:"String obfuscator",category:"Developer",icon:"◈",desc:"Represent text as escaped Unicode or Base64.",fields:[{name:"text",label:"Text to obfuscate",type:"textarea",placeholder:"Enter text"},{name:"format",label:"Encoding",type:"select",options:["Unicode escapes","Hex escapes","Base64"]}]},
  {id:"php-validate",title:"PHP validator",category:"Developer",icon:"🐘",desc:"Quick browser-side checks for common PHP syntax issues.",note:"Lightweight checks only—not a replacement for PHP's official parser or lint command.",fields:[{name:"code",label:"PHP code",type:"textarea",placeholder:"<?php\n$hello = 'world';"}]},
  {id:"python-validate",title:"Python validator",category:"Developer",icon:"⌁",desc:"Quick browser-side checks for common Python syntax issues.",note:"Lightweight checks only—not a replacement for Python's official parser or compile command.",fields:[{name:"code",label:"Python code",type:"textarea",placeholder:"def greet(name):\n    return f'Hello, {name}'"}]},
  {id:"regex-create",title:"Friendly regex creator",category:"Developer",icon:"⌁",desc:"Build a regular expression from common matching needs.",fields:[{name:"pattern",label:"What do you want to match?",type:"select",options:["Email address","URL","Digits only","Letters only","Whitespace","IPv4 address","Date (YYYY-MM-DD)","Custom character set"]},{name:"custom",label:"Custom characters (if selected)",type:"text",placeholder:"e.g. a-z0-9_"},{name:"flags",label:"Flags",type:"checks",options:["g","i","m"]}]},
  {id:"regex-test",title:"Regex tester",category:"Developer",icon:"⌕",desc:"Try a regular expression against sample text.",fields:[{name:"pattern",label:"Pattern (without slashes)",type:"text",placeholder:"\\b\\w+@\\w+\\.\\w+\\b"},{name:"flags",label:"Flags",type:"text",placeholder:"gi"},{name:"text",label:"Test text",type:"textarea",placeholder:"Paste text to test"}]},
  {id:"uuid",title:"UUID / GUID generator",category:"Generator",icon:"◇",desc:"Generate cryptographically random UUID v4 identifiers.",fields:[{name:"count",label:"How many? (1–100)",type:"number",value:"1"}]},
  {id:"password",title:"Password generator",category:"Generator",icon:"⛨",desc:"Create a secure password from 10 to 512 characters.",fields:[{name:"length",label:"Length (10–512)",type:"number",value:"24"},{name:"sets",label:"Include character sets",type:"checks",options:["Lowercase","Uppercase","Numbers","Symbols"]}]},
  {id:"markdown",title:"Markdown to HTML",category:"Text",icon:"M↓",desc:"Convert basic Markdown to HTML right in your browser.",note:"Raw HTML is escaped for safety. Supports headings, paragraphs, lists, links, bold, italics, and code.",fields:[{name:"markdown",label:"Markdown",type:"textarea",placeholder:"# Hello!\n\nWrite **Markdown** here."}]},
  {id:"morse-decode",title:"Morse code to text",category:"Text",icon:"·−",desc:"Translate Morse code into readable text.",fields:[{name:"text",label:"Morse code",type:"textarea",placeholder:".... . .-.. .-.. --- / .-- --- .-. .-.. -.."}]},
  {id:"morse-encode",title:"Text to Morse code",category:"Text",icon:"−·",desc:"Translate letters and numbers into Morse code.",fields:[{name:"text",label:"Text",type:"textarea",placeholder:"Hello world"}]},
  {id:"braille",title:"Text to Braille",category:"Text",icon:"⠿",desc:"Translate English letters and numbers into Unicode Braille.",fields:[{name:"text",label:"Text",type:"textarea",placeholder:"Hello world"}]},
  {id:"url-sanitize",title:"URL sanitizer",category:"Web",icon:"⌁",desc:"Normalize a URL and remove common tracking parameters.",fields:[{name:"url",label:"URL",type:"text",placeholder:"https://example.com/page?utm_source=newsletter"}]},
  {id:"url-disarm",title:"URL disarmer",category:"Web",icon:"↗",desc:"Unwrap encoded links and inspect their destination without opening them.",note:"This only inspects the URL; it never navigates to it.",fields:[{name:"url",label:"URL to inspect",type:"textarea",placeholder:"Paste a suspicious or encoded URL"}]},
  {id:"timestamp",title:"Unix timestamp converter",category:"Converter",icon:"◷",desc:"Convert timestamps and dates in either direction.",fields:[{name:"value",label:"Timestamp (seconds or milliseconds) or date",type:"text",placeholder:"1700000000 or 2024-01-01T12:00:00Z"}]},
  {id:"chmod",title:"chmod & chown converter",category:"Converter",icon:"▤",desc:"Convert Unix file permissions and inspect ownership notation.",fields:[{name:"permissions",label:"Permission (octal or symbolic)",type:"text",placeholder:"755 or rwxr-xr-x"},{name:"owner",label:"Owner:group (optional)",type:"text",placeholder:"www-data:www-data"}]},
  {id:"log-scrub",title:"Log scrubber & syslog anonymizer",category:"Security",icon:"▧",desc:"Redact IPs, email addresses, and common user/host fields locally.",fields:[{name:"log",label:"Log text",type:"textarea",placeholder:"Paste log lines to anonymize"},{name:"options",label:"Redact",type:"checks",options:["IP addresses","Email addresses","Usernames","Hostnames"]}]},
  {id:"subnet",title:"Subnet calculator",category:"Network",icon:"⌗",desc:"Calculate an IPv4 network, range, and broadcast address.",fields:[{name:"cidr",label:"IPv4 address / CIDR",type:"text",placeholder:"192.168.1.25/24"}]},
  {id:"coin",title:"Coin flip",category:"Fun",icon:"◉",desc:"Leave it to a fair, cryptographically random coin flip.",fields:[]},
  {id:"dice",title:"Dice roller",category:"Fun",icon:"⚄",desc:"Roll standard dice with a simple notation.",fields:[{name:"notation",label:"Dice notation",type:"text",value:"2d6+1",placeholder:"2d6+1"}]},
  {id:"card",title:"Test card generator",category:"Generator",icon:"▰",desc:"Generate Luhn-valid test card numbers for payment form testing.",note:"Numbers are for testing only and cannot be used to make payments.",fields:[{name:"brand",label:"Test card network",type:"select",options:["Visa","Mastercard","American Express"]}]},
  {id:"yesno",title:"Yes or no wheel",category:"Fun",icon:"↻",desc:"Can't decide? Spin for a random yes or no.",fields:[]}
];

const categories=["All tools",...new Set(tools.map(tool=>tool.category))];
const grid=document.querySelector("#toolGrid");
const filters=document.querySelector("#categoryFilters");
let activeCategory="All tools";

function esc(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function fieldMarkup(field){
  if(field.type==="checks") return `<div class="field"><span class="field-label">${esc(field.label)}</span><div class="check-row">${field.options.map((option,i)=>`<label><input type="checkbox" name="${esc(field.name)}" value="${esc(option)}"${field.name==="sets"&&i<3?" checked":""}>${esc(option)}</label>`).join("")}</div></div>`;
  const id=`f-${field.name}`;
  if(field.type==="select") return `<label class="field"><span class="field-label">${esc(field.label)}</span><select id="${id}" name="${esc(field.name)}">${field.options.map((option,i)=>`<option value="${esc(option)}"${i===0?" selected":""}>${esc(option)}</option>`).join("")}</select></label>`;
  const type=field.type==="textarea"?"textarea":"input";
  const attrs=field.type==="textarea"?`rows="3"`:`type="${esc(field.type||"text")}"`;
  const extras=field.value!==undefined?`value="${esc(field.value)}"`:"";
  const placeholder=field.placeholder?`placeholder="${esc(field.placeholder)}"`:"";
  return `<label class="field"><span class="field-label">${esc(field.label)}</span><${type} ${attrs} id="${id}" name="${esc(field.name)}" ${extras} ${placeholder}></${type}></label>`;
}
function render(){
  grid.innerHTML=tools.map(tool=>`<article class="tool-card" data-id="${tool.id}" data-category="${esc(tool.category)}"><div class="tool-head"><span class="tool-icon" aria-hidden="true">${tool.icon}</span><div><h3 class="tool-title">${esc(tool.title)}</h3><p class="tool-desc">${esc(tool.desc)}</p></div><span class="tool-category">${esc(tool.category)}</span></div><form class="tool-form" data-tool="${tool.id}">${tool.note?`<p class="tool-note">${esc(tool.note)}</p>`:""}${tool.fields.map(fieldMarkup).join("")}<button class="run-btn" type="submit">${tool.fields.length?"Run tool":"Try it"}</button><div class="result" role="status" aria-live="polite"></div></form></article>`).join("");
  filters.innerHTML=categories.map(category=>`<button type="button" class="filter-btn${category===activeCategory?" active":""}" data-category="${esc(category)}">${esc(category)}</button>`).join("");
}
render();

function formValues(form){
  const values={};
  new FormData(form).forEach((value,key)=>{if(values[key]===undefined)values[key]=value;else if(Array.isArray(values[key]))values[key].push(value);else values[key]=[values[key],value];});
  return values;
}
function say(form,text,kind=""){
  const box=form.querySelector(".result");box.className=`result${kind?` ${kind}`:""}`;box.textContent=text;
  const actions=document.createElement("div");actions.className="result-actions";const copy=document.createElement("button");copy.type="button";copy.className="copy-btn";copy.textContent="Copy result";copy.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(box.firstChild.textContent);copy.textContent="Copied!";setTimeout(()=>copy.textContent="Copy result",1200);}catch{copy.textContent="Select and copy";}});actions.append(copy);box.append(actions);
}
function bytesToB64(bytes){let binary="";for(const b of bytes)binary+=String.fromCharCode(b);return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function b64ToBytes(text){const raw=atob(text.replace(/-/g,"+").replace(/_/g,"/"));return Uint8Array.from(raw,c=>c.charCodeAt(0));}
function secureIndex(length){const limit=Math.floor(65536/length)*length;const values=new Uint16Array(1);do{crypto.getRandomValues(values);}while(values[0]>=limit);return values[0]%length;}
function randomString(length,chars){let result="";for(let i=0;i<length;i++)result+=chars[secureIndex(chars.length)];return result;}
async function loadScript(src,globalName){
  if(window[globalName])return window[globalName];
  if(!loadScript.cache)loadScript.cache={};
  if(loadScript.cache[src])return loadScript.cache[src];
  if(globalName==="argon2")window.argon2WasmPath="https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2.wasm";
  loadScript.cache[src]=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src=src;script.async=true;script.onload=()=>window[globalName]?resolve(window[globalName]):reject(new Error("Library loaded but was not available."));script.onerror=()=>reject(new Error("Could not load the browser library. Check your internet connection and try again."));document.head.append(script);});
  try{return await loadScript.cache[src];}catch(error){delete loadScript.cache[src];throw error;}
}
function parseIPv4(input){
  const parts=input.split(".");if(parts.length!==4||parts.some(part=>!/^\d{1,3}$/.test(part)||Number(part)>255))throw new Error("Enter a valid IPv4 address.");return parts.reduce((value,part)=>((value<<8)|Number(part))>>>0,0);
}
function ipText(value){return[(value>>>24)&255,(value>>>16)&255,(value>>>8)&255,value&255].join(".");}
function morseMap(){return{"A":".-","B":"-...","C":"-.-.","D":"-..","E":".","F":"..-.","G":"--.","H":"....","I":"..","J":".---","K":"-.-","L":".-..","M":"--","N":"-.","O":"---","P":".--.","Q":"--.-","R":".-.","S":"...","T":"-","U":"..-","V":"...-","W":".--","X":"-..-","Y":"-.--","Z":"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",".":".-.-.-",",":"--..--","?":"..--..","!":"-.-.--","/":"-..-.","(": "-.--.",")":"-.--.-","&":".-...",";":"-.-.-.",":":"---...","=":"-...-","+":".-.-.","-":"-....-","_":"..--.-",'"':".-..-.","@":".--.-.","'":".----."};}
const brailleMap={"a":"⠁","b":"⠃","c":"⠉","d":"⠙","e":"⠑","f":"⠋","g":"⠛","h":"⠓","i":"⠊","j":"⠚","k":"⠅","l":"⠇","m":"⠍","n":"⠝","o":"⠕","p":"⠏","q":"⠟","r":"⠗","s":"⠎","t":"⠞","u":"⠥","v":"⠧","w":"⠺","x":"⠭","y":"⠽","z":"⠵","1":"⠁","2":"⠃","3":"⠉","4":"⠙","5":"⠑","6":"⠋","7":"⠛","8":"⠓","9":"⠊","0":"⠚",",":"⠂",";":"⠆",":":"⠒",".":"⠲","!":"⠖","?":"⠦","-":"⠤","'":"⠄","(":"⠣",")":"⠜"};
const trackerParams=/^(utm_[a-z0-9_]+|fbclid|gclid|dclid|mc_cid|mc_eid|yclid|_ga|vero_id|igshid)$/i;

async function runTool(id,v,form){
  switch(id){
    case"pgp":{
      const pgp=await loadScript("https://cdn.jsdelivr.net/npm/openpgp@5.11.0/dist/openpgp.min.js","openpgp");
      if(!v.message||!v.publicKey)throw new Error("Add the signed message and public key.");
      const key=await pgp.readKey({armoredKey:v.publicKey});
      const detached=Boolean(v.signature);
      const message=detached?(v.message.trimStart().startsWith("-----BEGIN PGP MESSAGE-----")?await pgp.readMessage({armoredMessage:v.message}):await pgp.createMessage({text:v.message})):await pgp.readCleartextMessage({cleartextMessage:v.message});
      const options={message,verificationKeys:key};if(detached)options.signature=await pgp.readSignature({armoredSignature:v.signature});
      const result=await pgp.verify(options);const verified=await result.signatures[0].verified;
      if(!verified)throw new Error("Signature does not match this public key and message.");
      return "Signature verified successfully.";
    }
    case"encrypt":{
      if(!v.key||!v.data)throw new Error("Enter both a key and some data.");
      const enc=new TextEncoder(),mode=v.mode.toUpperCase();
      const alg={name:"PBKDF2",hash:"SHA-256"};
      if(v.action==="Encrypt"){
        const salt=crypto.getRandomValues(new Uint8Array(16));
        const iv=crypto.getRandomValues(new Uint8Array(mode==="GCM"?12:16));
        const base=await crypto.subtle.importKey("raw",enc.encode(v.key),"PBKDF2",false,["deriveKey"]);
        const key=await crypto.subtle.deriveKey({...alg,salt,iterations:150000},base,{name:`AES-${mode}`,length:256},false,["encrypt"]);
        const params=mode==="CTR"?{name:"AES-CTR",counter:iv,length:64}:mode==="CBC"?{name:"AES-CBC",iv}:{name:"AES-GCM",iv};
        const data=await crypto.subtle.encrypt(params,key,enc.encode(v.data));
        return `DF1.${mode}.${bytesToB64(salt)}.${bytesToB64(iv)}.${bytesToB64(new Uint8Array(data))}`;
      }
      const pieces=v.data.trim().split(".");if(pieces.length!==5||pieces[0]!=="DF1")throw new Error("This does not look like a DF1 encrypted payload.");
      const [,storedMode,saltText,ivText,cipherText]=pieces;if(!["GCM","CBC","CTR"].includes(storedMode))throw new Error("Unknown encryption mode.");
      const salt=b64ToBytes(saltText),iv=b64ToBytes(ivText),base=await crypto.subtle.importKey("raw",enc.encode(v.key),"PBKDF2",false,["deriveKey"]);
      const key=await crypto.subtle.deriveKey({...alg,salt,iterations:150000},base,{name:`AES-${storedMode}`,length:256},false,["decrypt"]);
      const params=storedMode==="CTR"?{name:"AES-CTR",counter:iv,length:64}:storedMode==="CBC"?{name:"AES-CBC",iv}:{name:"AES-GCM",iv};
      const clear=await crypto.subtle.decrypt(params,key,b64ToBytes(cipherText));return new TextDecoder().decode(clear);
    }
    case"php-hash":{
      if(!v.password)throw new Error("Enter a password.");
      if(v.algorithm==="bcrypt"){
        const cost=Number(v.cost);if(!Number.isInteger(cost)||cost<4||cost>16)throw new Error("bcrypt cost must be an integer from 4 to 16.");
        const lib=await loadScript("https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/dist/bcrypt.min.js","dcodeIO");
        const hash=lib.bcrypt.hashSync(v.password,cost);return hash.replace(/^\$2[ab]\$/,"$2y$");
      }
      const argon=await loadScript("https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js","argon2");
      const salt=crypto.getRandomValues(new Uint8Array(16));
      const result=await argon.hash({pass:v.password,salt,type:argon.ArgonType.Argon2id,time:4,mem:65536,parallelism:1,hashLen:32});
      return result.encoded;
    }
    case"php-verify":{
      if(!v.password||!v.hash)throw new Error("Enter both the password and its hash.");
      if(/^\$2[aby]\$/.test(v.hash)){
        const lib=await loadScript("https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/dist/bcrypt.min.js","dcodeIO");
        return lib.bcrypt.compareSync(v.password,v.hash.replace(/^\$2y\$/,"$2b$"))?"Password matches the hash.":"Password does not match the hash.";
      }
      if(/^\$argon2id\$/.test(v.hash)){
        const argon=await loadScript("https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js","argon2");
        try{await argon.verify({pass:v.password,encoded:v.hash});return"Password matches the hash.";}
        catch(error){if(error.code===-35)return"Password does not match the hash.";throw error;}
      }
      throw new Error("Unsupported hash. Provide a PHP bcrypt ($2y$) or Argon2id hash.");
    }
    case"gitignore":{
      const map={Node:"node_modules/\ndist/\ncoverage/\n",Python:"__pycache__/\n*.py[cod]\n.venv/\nvenv/\n",PHP:"/vendor/\n.phpunit.cache/\n",Java:"*.class\n/build/\n/target/\n",Rust:"/target/\n",Go:"/bin/\n",Windows:"Thumbs.db\nehthumbs.db\nDesktop.ini\n",macOS:".DS_Store\n.AppleDouble\n.LSOverride\n",Linux:"*~\n.fuse_hidden*\n", "Visual Studio Code":".vscode/\n!.vscode/extensions.json\n",JetBrains:".idea/\n*.iml\n", "Environment files":".env\n.env.*\n!.env.example\n"};
      const chosen=v.presets||[];if(!chosen.length)throw new Error("Choose at least one preset.");return [...new Set(chosen.flatMap(name=>map[name].trim().split("\n")))].join("\n")+"\n";
    }
    case"obfuscate":{
      if(!v.text)throw new Error("Enter text to obfuscate.");
      if(v.format==="Base64")return btoa(unescape(encodeURIComponent(v.text)));
      return Array.from(v.text).map(char=>{const code=char.codePointAt(0);return v.format==="Hex escapes"?`\\x${code.toString(16).padStart(2,"0")}`:`\\u{${code.toString(16)}}`;}).join("");
    }
    case"php-validate":{
      if(!v.code.trim())throw new Error("Paste PHP code to check.");
      const issues=[];if(!/<\?(php|=)/i.test(v.code))issues.push("No PHP opening tag found.");
      if((v.code.match(/\{/g)||[]).length!==(v.code.match(/\}/g)||[]).length)issues.push("Curly brace counts do not match.");
      if((v.code.match(/\(/g)||[]).length!==(v.code.match(/\)/g)||[]).length)issues.push("Parenthesis counts do not match.");
      if((v.code.match(/\[/g)||[]).length!==(v.code.match(/\]/g)||[]).length)issues.push("Square bracket counts do not match.");
      return issues.length?`Potential issues:\n• ${issues.join("\n• ")}`:"Basic checks passed. This is not a full PHP syntax check.";
    }
    case"python-validate":{
      if(!v.code.trim())throw new Error("Paste Python code to check.");
      const issues=[];if((v.code.match(/\(/g)||[]).length!==(v.code.match(/\)/g)||[]).length)issues.push("Parenthesis counts do not match.");
      if((v.code.match(/\[/g)||[]).length!==(v.code.match(/\]/g)||[]).length)issues.push("Square bracket counts do not match.");
      if((v.code.match(/\{/g)||[]).length!==(v.code.match(/\}/g)||[]).length)issues.push("Curly brace counts do not match.");
      const lines=v.code.split("\n");lines.forEach((line,i)=>{if(/^\s*(def|class|if|elif|else|for|while|try|except|finally|with)\b/.test(line.trimEnd())&&!/:(?:\s*(?:#.*)?)?$/.test(line))issues.push(`Line ${i+1}: expected a colon at the end of the statement.`);});
      return issues.length?`Potential issues:\n• ${issues.join("\n• ")}`:"Basic checks passed. This is not a full Python syntax check.";
    }
    case"regex-create":{
      const patterns={"Email address":"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}","URL":"https?:\\/\\/[^\\s/$.?#].[^\\s]*","Digits only":"\\d+","Letters only":"[A-Za-z]+","Whitespace":"\\s+","IPv4 address":"(?:\\d{1,3}\\.){3}\\d{1,3}","Date (YYYY-MM-DD)":"\\d{4}-\\d{2}-\\d{2}","Custom character set":`[${(v.custom||"").replace(/[\\\]\-^]/g,"\\$&")}]+`};
      const pattern=patterns[v.pattern];if(!pattern)throw new Error("Enter a character set for the custom pattern.");
      return `/${pattern}/${(v.flags||[]).join("")}`;
    }
    case"regex-test":{
      if(!v.pattern)throw new Error("Enter a regular expression.");
      if(v.pattern.length>300||(v.text||"").length>20000)throw new Error("Pattern is limited to 300 characters and test text to 20,000 characters.");
      const text=v.text||"",flags=[...new Set(v.flags||"")].join("");
      const workerCode=`onmessage=({data})=>{try{const regex=new RegExp(data.pattern,data.flags);const matches=regex.global?[...data.text.matchAll(regex)].slice(0,100):[regex.exec(data.text)].filter(Boolean);postMessage({matches:matches.map(m=>({value:m[0],index:m.index}))});}catch(error){postMessage({error:error.message});}}`;
      const workerUrl=URL.createObjectURL(new Blob([workerCode],{type:"text/javascript"}));
      let matches;try{matches=await new Promise((resolve,reject)=>{const worker=new Worker(workerUrl);const timer=setTimeout(()=>{worker.terminate();reject(new Error("This pattern took too long to evaluate. Try a simpler expression."));},500);worker.onmessage=event=>{clearTimeout(timer);worker.terminate();event.data.error?reject(new Error(`Invalid regular expression: ${event.data.error}`)):resolve(event.data.matches);};worker.onerror=()=>{clearTimeout(timer);worker.terminate();reject(new Error("Could not run that regular expression."));};worker.postMessage({pattern:v.pattern,flags,text});});}finally{URL.revokeObjectURL(workerUrl);}
      return matches.length?`${matches.length} match(es):\n${matches.map(match=>`“${match.value}” at ${match.index}`).join("\n")}`:"No matches.";
    }
    case"uuid":{
      const count=Number(v.count);if(!Number.isInteger(count)||count<1||count>100)throw new Error("Choose a count from 1 to 100.");if(!crypto.randomUUID)throw new Error("UUID generation is not supported in this browser.");
      return Array.from({length:count},()=>crypto.randomUUID()).join("\n");
    }
    case"password":{
      const length=Number(v.length);if(!Number.isInteger(length)||length<10||length>512)throw new Error("Choose a length from 10 to 512.");
      const sets=v.sets||[];const groups=[];if(sets.includes("Lowercase"))groups.push("abcdefghijklmnopqrstuvwxyz");if(sets.includes("Uppercase"))groups.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");if(sets.includes("Numbers"))groups.push("0123456789");if(sets.includes("Symbols"))groups.push("!@#$%^&*()-_=+[]{};:,.?/|~");
      if(!groups.length)throw new Error("Select at least one character set.");
      if(length<groups.length)throw new Error("Password length must be at least the number of selected character sets.");
      const chars=groups.join("");const result=groups.map(group=>group[secureIndex(group.length)]);while(result.length<length)result.push(chars[secureIndex(chars.length)]);
      for(let i=result.length-1;i>0;i--){const j=secureIndex(i+1);[result[i],result[j]]=[result[j],result[i]];}return result.join("");
    }
    case"markdown":{
      if(!v.markdown)throw new Error("Enter some Markdown.");
      let text=esc(v.markdown).replace(/\r\n?/g,"\n");
      text=text.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>");
      text=text.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(whole,label,url)=>{try{const parsed=new URL(url,location.href);if(!["http:","https:","mailto:"].includes(parsed.protocol))return label;return `<a href="${esc(parsed.href)}">${label}</a>`;}catch{return label;}});
      const blocks=text.split(/\n{2,}/).map(block=>{const heading=block.match(/^(#{1,6})\s+(.+)$/);if(heading)return `<h${heading[1].length}>${heading[2]}</h${heading[1].length}>`;const lines=block.split("\n");if(lines.every(line=>/^[-*]\s+/.test(line)))return `<ul>${lines.map(line=>`<li>${line.replace(/^[-*]\s+/,"")}</li>`).join("")}</ul>`;if(lines.every(line=>/^\d+\.\s+/.test(line)))return `<ol>${lines.map(line=>`<li>${line.replace(/^\d+\.\s+/,"")}</li>`).join("")}</ol>`;return `<p>${block.replace(/\n/g,"<br>")}</p>`;});
      return blocks.join("\n");
    }
    case"morse-encode":{
      const map=morseMap();return (v.text||"").toUpperCase().split(/\s+/).map(word=>[...word].map(char=>map[char]||"").filter(Boolean).join(" ")).join(" / ");
    }
    case"morse-decode":{
      const reverse=Object.fromEntries(Object.entries(morseMap()).map(([char,code])=>[code,char]));
      return (v.text||"").trim().split(/\s*\/\s*/).map(word=>word.trim().split(/\s+/).map(code=>reverse[code]||"�").join("")).join(" ");
    }
    case"braille":{
      let output="",numberMode=false;
      for(const char of v.text||""){
        if(/\d/.test(char)){if(!numberMode)output+="⠼";output+=brailleMap[char];numberMode=true;continue;}
        numberMode=false;
        if(/[A-Z]/.test(char))output+="⠠";
        const lower=char.toLowerCase();output+=char===" "?" ":brailleMap[lower]||"�";
      }
      return output;
    }
    case"url-sanitize":{
      let url;try{url=new URL(v.url);}catch{throw new Error("Enter a complete, valid URL including https://.");}
      if(!["http:","https:"].includes(url.protocol))throw new Error("Only HTTP and HTTPS URLs are supported.");
      for(const key of [...url.searchParams.keys()])if(trackerParams.test(key))url.searchParams.delete(key);
      url.username="";url.password="";return url.toString();
    }
    case"url-disarm":{
      if(!v.url)throw new Error("Paste a URL to inspect.");
      let decoded=v.url.trim();for(let i=0;i<3;i++){try{const next=decodeURIComponent(decoded);if(next===decoded)break;decoded=next;}catch{break;}}
      const match=decoded.match(/https?:\/\/[^\s"'<>]+/i);const candidate=match?match[0]:decoded;
      try{const url=new URL(candidate);return `Destination (not opened):\n${url.href}\n\nProtocol: ${url.protocol}\nHost: ${url.hostname}\nPort: ${url.port||"(default)"}\nPath: ${url.pathname}\n\n${url.username||url.password?"Warning: URL contains embedded credentials.":""}`;}catch{return `Decoded text (not opened):\n${decoded}`;}
    }
    case"timestamp":{
      if(!v.value)throw new Error("Enter a timestamp or date.");
      let date;if(/^-?\d+(\.\d+)?$/.test(v.value.trim())){let stamp=Number(v.value);if(Math.abs(stamp)<1e11)stamp*=1000;date=new Date(stamp);}else date=new Date(v.value);
      if(Number.isNaN(date.getTime()))throw new Error("Could not parse that timestamp or date.");
      return `UTC: ${date.toISOString()}\nLocal: ${date.toString()}\nUnix seconds: ${Math.floor(date.getTime()/1000)}\nUnix milliseconds: ${date.getTime()}`;
    }
    case"chmod":{
      const input=(v.permissions||"").trim();let mode,octal;
      if(/^[0-7]{3,4}$/.test(input)){
        const special=input.length===4?Number(input[0]):0;octal=input.slice(-3);
        const symbols=[...octal].map(d=>{const n=Number(d);return`${n&4?"r":"-"}${n&2?"w":"-"}${n&1?"x":"-"}`;});
        if(special&4)symbols[0]=symbols[0].slice(0,2)+(symbols[0][2]==="x"?"s":"S");
        if(special&2)symbols[1]=symbols[1].slice(0,2)+(symbols[1][2]==="x"?"s":"S");
        if(special&1)symbols[2]=symbols[2].slice(0,2)+(symbols[2][2]==="x"?"t":"T");
        mode=symbols.join("");if(input.length===4)octal=input[0]+octal;
      }
      else if(/^[r-][w-][xsS-][r-][w-][xsS-][r-][w-][xtT-]$/.test(input)){
        mode=input;const special=(/[sS]/.test(input[2])?4:0)+(/[sS]/.test(input[5])?2:0)+(/[tT]/.test(input[8])?1:0);
        const permissions=[0,3,6].map(i=>String((input[i]==="r"?4:0)+(input[i+1]==="w"?2:0)+(/[xst]/.test(input[i+2])?1:0))).join("");
        octal=(special?String(special):"")+permissions;
      }
      else throw new Error("Enter a three/four-digit octal permission or nine-character symbolic mode.");
      const owner=(v.owner||"").trim();return `Symbolic: ${mode}\nOctal: ${octal}${owner?`\nOwner: ${owner}`:""}${owner&&!owner.includes(":")?"\nTip: use user:group notation to show both owner and group.":""}`;
    }
    case"log-scrub":{
      let text=v.log||"";if(!text)throw new Error("Paste log text to scrub.");
      const opts=v.options||[];if(opts.includes("Email addresses"))text=text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,"[EMAIL]");
      if(opts.includes("IP addresses"))text=text.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g,"[IP]").replace(/\b(?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}\b/gi,"[IP]");
      if(opts.includes("Usernames"))text=text.replace(/(\b(?:user(?:name)?|login|account)\s*[=:]\s*)["']?[\w.@-]+/gi,"$1[USER]");
      if(opts.includes("Hostnames"))text=text.replace(/(\b(?:host(?:name)?|server)\s*[=:]\s*)[\w.-]+/gi,"$1[HOST]");
      return text;
    }
    case"subnet":{
      const match=(v.cidr||"").trim().match(/^(.+?)\/(\d{1,2})$/);if(!match)throw new Error("Use IPv4 CIDR notation, for example 192.168.1.25/24.");
      const ip=parseIPv4(match[1]),prefix=Number(match[2]);if(prefix>32)throw new Error("CIDR prefix must be between 0 and 32.");
      const mask=prefix===0?0:(0xffffffff<<(32-prefix))>>>0;const network=(ip&mask)>>>0;const broadcast=(network|(~mask>>>0))>>>0;const count=2**(32-prefix);
      return `Network: ${ipText(network)}/${prefix}\nSubnet mask: ${ipText(mask)}\nBroadcast: ${ipText(broadcast)}\nAddress count: ${count.toLocaleString()}\nUsable hosts: ${count<=2?0:count-2}\nUsable range: ${count<=2?"none":`${ipText(network+1)} – ${ipText(broadcast-1)}`}`;
    }
    case"coin":return secureIndex(2)?"Heads":"Tails";
    case"dice":{
      const match=(v.notation||"").trim().match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!match)throw new Error("Use dice notation such as 2d6+1.");
      const count=Number(match[1]||1),sides=Number(match[2]),mod=Number(match[3]||0);
      if(count<1||count>100||sides<2||sides>1000)throw new Error("Roll 1–100 dice with 2–1000 sides each.");
      const rolls=Array.from({length:count},()=>secureIndex(sides)+1);return `Rolls: ${rolls.join(", ")}\nModifier: ${mod>=0?"+":""}${mod}\nTotal: ${rolls.reduce((sum,n)=>sum+n,0)+mod}`;
    }
    case"card":{
      const bins={Visa:"424242",Mastercard:"555555", "American Express":"378282"};const bin=bins[v.brand];const length=v.brand==="American Express"?15:16;
      const digits=bin.split("").map(Number);while(digits.length<length-1)digits.push(secureIndex(10));
      const sum=digits.slice().reverse().reduce((total,digit,index)=>{let n=digit;if(index%2===0){n*=2;if(n>9)n-=9;}return total+n;},0);
      digits.push((10-sum%10)%10);const pan=digits.join("");const month=String(secureIndex(12)+1).padStart(2,"0");return `Test card number: ${pan}\nExpiry: ${month}/${String(new Date().getFullYear()+3).slice(-2)}\nCVC: ${randomString(v.brand==="American Express"?4:3,"0123456789")}\n\nTesting only — not for payments.`;
    }
    case"yesno":return secureIndex(2)?"Yes!":"Nope!";
    default:throw new Error("This tool is not available.");
  }
}

grid.addEventListener("submit",async event=>{
  if(!event.target.matches(".tool-form"))return;
  event.preventDefault();const form=event.target;const button=form.querySelector(".run-btn");button.disabled=true;button.textContent="Working…";
  try{const result=await runTool(form.dataset.tool,formValues(form),form);say(form,String(result),/^Password (matches|does not match)/.test(String(result))?(String(result).includes("does not")?"error":"ok"):"");}
  catch(error){say(form,error.message||"Something went wrong.","error");}
  finally{button.disabled=false;button.textContent=form.dataset.tool==="coin"||form.dataset.tool==="yesno"?"Try it":"Run tool";}
});
filters.addEventListener("click",event=>{const button=event.target.closest(".filter-btn");if(!button)return;activeCategory=button.dataset.category;filters.querySelectorAll(".filter-btn").forEach(filter=>filter.classList.toggle("active",filter===button));applyFilters();});
const search=document.querySelector("#search");
function applyFilters(){const query=search.value.trim().toLowerCase();let visible=0;grid.querySelectorAll(".tool-card").forEach(card=>{const matchCategory=activeCategory==="All tools"||card.dataset.category===activeCategory;const matchQuery=!query||card.textContent.toLowerCase().includes(query);card.hidden=!(matchCategory&&matchQuery);if(!card.hidden)visible++;});document.querySelector("#emptyState").hidden=visible!==0;}
search.addEventListener("input",applyFilters);
document.addEventListener("keydown",event=>{if(event.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){event.preventDefault();search.focus();}if(event.key==="Escape"&&document.activeElement===search){search.value="";search.blur();applyFilters();}});
