import { SSMLParser } from './src/ssml-parser/ssml-parser.service';

// *******START*****
console.log("SSML parser starting");

const ssmlText = `
  <speak level="strong">
    <prosody rate="slow">Hello, how are you?</prosody>
    <break time="500ms"/>
    <emphasis level="strong">This is important.</emphasis>
  </speak>
`;

const parser = new SSMLParser(ssmlText);
const parsedText = parser.parseSSML();
console.log(parsedText);
// *******END*****