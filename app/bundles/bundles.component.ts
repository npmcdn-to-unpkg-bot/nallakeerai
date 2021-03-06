import { Component, Input, ViewChild, ElementRef, NgZone, Renderer } from 'angular2/core';

import { DataService, TimeMode }   from '../data/data.service';

@Component({
  moduleId: __moduleName,
  selector: 'bundles',
  templateUrl: 'bundles.component.html',
  styleUrls: ['bundles.component.css'],
})
export class BundlesComponent {
  private all;
  quantity: number = 0;
  private farm: string;
  private plant: string;
  showEditor: boolean = false;

  @ViewChild('editor') editor: ElementRef;

  constructor(private service: DataService, private ngZone: NgZone, private renderer: Renderer) {
    this.refresh();
  }

  bundle(farm: string, plant: string) {
    if (this.all.bundles != null && this.all.bundles[farm] != null && this.all.bundles[farm][plant] != null)
      return this.all.bundles[farm][plant];
    else return "";
  }

  isSelected(farm: string, plant: string): boolean {
    return this.isDay() && this.farm == farm && this.plant == plant;
  }

  isHighlighted(farm: string, plant: string): boolean {
    return this.isDay() && (this.farm == farm || this.plant == plant);
  }

  private tm() {
    return this.service.getTimeMode();
  }

  isDay(): boolean {
    return this.tm() == TimeMode.DAY;
  }

  timeMode(): string {
    if(this.tm() == TimeMode.DAY) return "Day";
    else if(this.tm() == TimeMode.WEEK) return "Week";
    else return "Month";
  }

  private focusEditor() {
    //NOTE:
    //http://stackoverflow.com/questions/34502768/why-angular2-template-local-variables-are-not-usable-in-templates-when-using-ng
    //http://angularjs.blogspot.in/2016/04/5-rookie-mistakes-to-avoid-with-angular.html
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.editor.nativeElement, 'focus', []);
      });
    });
  }

  escape(event) {
    if (event.keyCode &&event.keyCode == 27) this.close();
  }

  close() {
    this.showEditor = false;
  }

  private refresh(): Promise<any> {
    //HACK: why is this required after switching TimeMode?
    return this.service.getAll().then( _all => {
      this.all = _all;
    });
  }

  private refreshThen(): ()=>void {
    //HACK: How to return promise and use it in then?
    return () => { this.refresh() };
  }

  addHarvestInternal(f: string, p: string, q: number) {
    this.service.addHarvest(f, p, q).then(this.refreshThen());
  }

  editHarvest(farm: string, plant: string) {
    this.showEditor = this.isDay();
    if (!this.showEditor) return;
    this.focusEditor();
    this.farm = farm;
    this.plant = plant;
    this.quantity = null;
  }

  onSubmit() {
    this.showEditor = false;
    this.addHarvestInternal(this.farm, this.plant, this.quantity);
  }

  addFarmInternal(code: string) {
    this.service.addFarm(code).then(this.refreshThen());
  }
  
  addFarm() {
    if(!this.isDay()) return;
    let code = prompt("Farm Code:");
    if (code == null || code.trim() == "") return;
    this.addFarmInternal(code); 
  }

  addPlantInternal(code: string) {
    this.service.addPlant(code).then(this.refreshThen());
  }
  
  addPlant() {
    if(!this.isDay()) return;
    let code = prompt("Plant Code:");
    if (code == null || code.trim() == "") return;
    this.addPlantInternal(code); 
  }

}
