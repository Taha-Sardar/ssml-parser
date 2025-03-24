export class SSMLBuilder {
  /**
   * Convert JSON object back to SSML string
   */
  public static build(json: Record<string, any>): string {
    return SSMLBuilder.objectToXml(json);
  }

  private static objectToXml(obj: Record<string, any>): string {
    let xml = "";
    for (const key in obj){
      if (key==='@attributes'){
        continue;
      }
      if (key==='#text'){
        continue;
      }

      const attributes = obj[key]["@attributes"]
        ? Object.entries(obj[key]["@attributes"])
            .map(([k, v]) => `${k}="${v}"`)
            .join(" ")
        : "";
      const openingTag = attributes ? `<${key} ${attributes}>` : `<${key}>`;
      const closingTag = `</${key}>`;

      if (Array.isArray(obj[key])) {
        xml += obj[key].map((item) => {
          let returnString = "";
          const innerXml = SSMLBuilder.objectToXml(item);
          if (innerXml === ""){
            const combinedTag = attributes ? `<${key} ${attributes}/>\n` : `<${key}/>\n`;
            returnString = combinedTag;
          } else {
            returnString = openingTag + '\n' + SSMLBuilder.objectToXml(item) + '\n' + closingTag;
          }
          return returnString;
        }).join("");
      } else {
        const innerContent = obj[key]["#text"] || SSMLBuilder.objectToXml(obj[key]);
        if (innerContent === ""){
          const combinedTag = attributes ? `<${key} ${attributes}/>` : `<${key}/>`;
          xml += combinedTag + '\n'
        } else {
          xml += openingTag + innerContent + closingTag + '\n';
        }
      }
    }

    return xml.trim();
  }
}