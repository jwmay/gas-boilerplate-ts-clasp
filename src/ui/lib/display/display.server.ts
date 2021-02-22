export class Display {
  static _defaultInput = {
    content: '',
    type: 'card',
    id: '',
    position: 'top',
    reset: false,
    close: false,
  }

  static create(input: object) {
    if (input) return { ...this._defaultInput, ...input }
    return this._defaultInput
  }
}

/**
 * Returns the content of the filename to be displayed in an HTML template.
 */
export function include(filename: string): string {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}
