import { DOMParser } from 'xmldom';

export class SSMLParser {
    private xmlDoc: Document;
    constructor(ssmlString: string) {
        const parser = new DOMParser();
        this.xmlDoc = parser.parseFromString(ssmlString, 'text/xml');
        // console.log("SSMLParser", this.xmlDoc);
    }

    public parseSSML():Record<string,any> {
        const rootElement = this.xmlDoc.documentElement;
        return this.nodeToJSON(rootElement);
    }

    private nodeToJSON(node: Element): Record<string, any> {
        const resultObject: Record<string, any> = {};
        if (node.attributes.length > 0){
            resultObject['attributes'] = {};
            Array.from(node.attributes).forEach(attr => {
                resultObject['attributes'][attr.nodeName] = attr.nodeValue;
            });
        }

        if (node.childNodes.length > 0) {
            let textContext = "";
            for (const child of Array.from(node.childNodes)) {
                if (child.nodeType === 3){ //Node.ELEMENT_NODE
                    textContext += child.textContent?.trim() || "";
                } else if (child.nodeType === 1){//Node.ELEMENT_NODE
                    const childElement = child as Element;
                    const childJson = this.nodeToJSON(childElement);

                    if (!resultObject[childElement.tagName]){
                        resultObject[childElement.tagName] = childJson;
                    } else {
                        if (!Array.isArray(resultObject[childElement.tagName])){
                            resultObject[childElement.tagName] = [resultObject[childElement.tagName]];
                        }
                        resultObject[childElement.tagName].push(childJson);
                    }
                }
            }
            if (textContext){
                resultObject['#text'] = textContext;
            }
        }
        return resultObject;
    }
}