import * as React from 'react';
import styles from './ScriptEditor.module.scss';
import { IScriptEditorProps } from './IScriptEditorProps';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react';
import { loadStyles } from '@microsoft/load-themed-styles';
require('./overrides.css');

export default class ScriptEditor extends React.Component<IScriptEditorProps, any> {
  constructor() {
    super();
    this.loadCss();
    this.state = {
      showDialog: false
    };
  }

  public async loadCss() {
    if (window["UIFabricLoaded"]) {
      return;
    }
    const response = await fetch("https://publiccdn.sharepointonline.com/techmikael.sharepoint.com/11510075fe4212d19d3e6d07c91981263dd697bf111cb1e5f0efb15de0ec08b382cde399/5.0.1/office-ui-fabric.min.css");
    if (response.ok) {
      response.text().then((data: any) => {
        loadStyles(data);
        window["UIFabricLoaded"] = true;
        this.forceUpdate();
      });
    }
  }

  public componentDidMount(): void {
    this.setState({ script: this.props.script, loaded: this.props.script });
  }
  private _showDialog() {
    this.setState({ showDialog: true });
  }

  private _closeDialog() {
    this.setState({ showDialog: false });
    this.props.save(this.state.script);
  }

  private _cancelDialog() {
    this.setState({ showDialog: false });
    this.state.script = this.state.loaded;
  }

  private _onScriptEditorTextChanged(text: string) {
    this.setState({ script: text });
  }

  public render(): React.ReactElement<IScriptEditorProps> {
    if (!window["UIFabricLoaded"]) {
      return <span />;
    }
    const viewMode = <span dangerouslySetInnerHTML={{ __html: this.state.script }}></span>;

    return (
      <div >
        <div className={styles.scriptEditor}>
          <div className={styles.container}>
            <div className={`pzl-Grid-row pzl-bgColor-themeDark pzl-fontColor-white ${styles.row}`}>
              <div className="pzl-Grid-col pzl-u-lg10 pzl-u-xl8 pzl-u-xlPush2 pzl-u-lgPush1">
                <span className="pzl-font-xl pzl-fontColor-white">The Modern Script Editor web part!</span>
                <p className="pzl-font-l pzl-fontColor-white"></p>
                <DefaultButton description='Opens the Sample Dialog' onClick={this._showDialog.bind(this)}>Edit snippet</DefaultButton>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog.bind(this)}
          title='Embed'
          subText='Paste your script, markup or embed code below. Note that scripts will only run in view mode.'
          isBlocking={true}
          className={'ScriptPart'}
        >
          <TextField multiline rows={15} onChanged={this._onScriptEditorTextChanged.bind(this)} value={this.state.script} />
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog.bind(this)}>Save</PrimaryButton>
            <DefaultButton onClick={this._cancelDialog.bind(this)}>Cancel</DefaultButton>
          </DialogFooter>
          {viewMode}
        </Dialog>
      </div >);
  }
}