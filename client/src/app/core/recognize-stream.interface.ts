export interface RecognizeStream {
  access_token: string;
  format?: boolean;
  keepMicrophone?: boolean;
  outputElement?: string;
  extractResults?: boolean;
  objectMode?: boolean;
  resultsBySpeaker?: boolean;
  mediaStream?: MediaStream;
}
