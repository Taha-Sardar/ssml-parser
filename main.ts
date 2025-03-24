import { SSMLParser } from './src/ssml-parser/ssml-parser.service';
import { SSMLBuilder } from './src/ssml-builder/ssml-builder.service';

// *******START*****
console.log("SSML parser starting");

const ssmlText = `
  <speak>
    <prosody rate="slow">Hello, how are you?</prosody>
    <break time="500ms"/>
    <emphasis level="strong">This is important.</emphasis>
  </speak>
`;

const parser = new SSMLParser(ssmlText);
const parsedText = parser.parseSSML();
console.log(parsedText);
const rebuiltSSML = SSMLBuilder.build(parsedText);
console.log(rebuiltSSML);
// *******END*****