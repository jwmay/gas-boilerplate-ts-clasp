import { Application } from './lib.application'

export class UI {
  /**
   * Displays an alert with a single OK button.
   */
  static showAlert(title: string, message: string): void {
    let ui = Application.getUi()
    ui.alert(title, message, ui.ButtonSet.OK)
  }

  /**
   * Displays an alert with 'Yes' and 'No' buttons. Returns the user selection
   * as true ('yes') or false ('no').
   */
  static showConfirmation(title: string, message: string): boolean {
    let ui = Application.getUi()
    let result = ui.alert(title, message, ui.ButtonSet.YES_NO)
    if (result === ui.Button.YES) return true
    return false
  }

  /**
   * Opens a dialog window using an HTML template with the given dimensions
   * and title.
   */
  static showDialog(
    source: string,
    width: number,
    height: number,
    title: string
  ): void {
    let ui = HtmlService.createTemplateFromFile(source)
      .evaluate()
      .setWidth(width)
      .setHeight(height)
    // [bug] this comment is needed to avoid 'You do not have permission to call
    //       Ui.showModalDialog' error (it seems the word 'Ui' must be present)
    Application.getUi().showModalDialog(ui, title)
  }

  /**
   * Displays a prompt and return the user's response.
   */
  static showPrompt(message: string): string {
    let ui = Application.getUi()
    let response = ui.prompt(message)

    // Process the user's response.
    if (response.getSelectedButton() === ui.Button.OK) {
      return response.getResponseText()
    } else {
      return null
    }
  }

  /**
   * Opens a sidebar using an HTML template.
   */
  static showSidebar(source: string, title: string): void {
    var ui = HtmlService.createTemplateFromFile(source)
      .evaluate()
      .setTitle(title)
    Application.getUi().showSidebar(ui)
  }
}
