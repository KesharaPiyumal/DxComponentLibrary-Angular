import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {EventEmitter} from 'events';

export interface CustomTreeParentNode {
  fullSelected: boolean;
  label: string;
  data: string;
  children: CustomTreeChildNode[];
}

export interface CustomTreeChildNode {
  selected: boolean;
  border: boolean;
  parent: string;
  label: string;
  data: string;
  imei?: string;
  dropDown?: CustomTreeChildNodeDropdown;
}

export interface CustomTreeChildNodeDropdown {
  dropDownValue: number;
  array: DropDownItem[];
}

export interface DropDownItem {
  value: number;
  label: string;
}

@Component({
  selector: 'app-dx-tree',
  templateUrl: './dx-tree.component.html',
  styleUrls: ['./dx-tree.component.css']
})
export class DxTreeComponent implements OnInit {

  @Output() selectionChange: any = new EventEmitter();

  @Input() set customTreeArray(array) {
    this.customTree = array;
    this.tempInitialGroupArray = array;
  }

  customTree: CustomTreeParentNode[] = [];
  tempInitialGroupArray: CustomTreeParentNode[] = [];
  customSelectedChildren: CustomTreeChildNode[] = [];
  search: any;
  isSelectedAllChildrenInCustomTree = false;

  @Input() set patchSelected(array) {
    if (array.length) {
      array.forEach(item => {
        this.customTree.forEach(parentItem => {
          parentItem['children'].forEach(childItem => {
            if (item['data'] === childItem['data'] && parentItem['data'] === childItem['parent']) {
              this.customSelectedChildren.push(childItem);
              childItem['selected'] = true;
            }
          });
        });
      });
      this.checkAllChildSelectedInParticularGroup();
      this.checkAllSelected();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  selectChild(parentIndex: number, childIndex: number) {
    const child = this.customTree[parentIndex].children[childIndex];
    if (this.customSelectedChildren.length > 0) {
      let index;
      this.customSelectedChildren.forEach(item => {
        if (item === child) {
          child['selected'] = false;
          index = this.customSelectedChildren.indexOf(item);
        }
      });
      if (index !== undefined && index !== -1) {
        this.customSelectedChildren.splice(index, 1);
      } else {
        this.customSelectedChildren.push(child);
        child['selected'] = true;
      }
    } else {
      this.customSelectedChildren.push(child);
      child['selected'] = true;
    }
    const group = this.customTree[parentIndex];
    const groupLength = this.customTree[parentIndex]['children']['length'];
    let counter = 0;
    group['children'].forEach(ch => {
      if (ch['selected']) {
        counter++;
      }
    });
    group['fullSelected'] = counter === groupLength;
    this.checkAllSelected();
    this.selectionChange.emit(this.customSelectedChildren);
  }

  setGroupSelectionCustomTree(event: any, parentIndex) {
    const group = this.customTree[parentIndex];
    const removeIndexes = [];
    this.customSelectedChildren.forEach(cSChild => {
      if (cSChild['parent'] === group['data']) {
        removeIndexes.push(cSChild);
      }
    });
    // filter issue fixed
    const temp = [];
    this.customSelectedChildren.forEach(cSChild => {
      if (!removeIndexes.includes(cSChild)) {
        temp.push(cSChild);
      }
    });
    this.customSelectedChildren = temp;
    // for (let i = removeIndexes.length - 1; i >= 0; i--) {
    //   this.customSelectedChildren.splice(removeIndexes[i], 1);
    // }
    group['children'].forEach(ch => {
      ch['selected'] = event;
      if (event) {
        this.customSelectedChildren.push(ch);
      }
    });
    this.checkAllSelected();
    this.selectionChange.emit(this.customSelectedChildren);
  }

  checkAllChildSelectedInParticularGroup() {
    this.customTree.forEach(item => {
      let selectedCounter = 0;
      let childCounter = 0;
      item['children'].forEach(ch => {
        if (ch['selected']) {
          selectedCounter++;
        }
        childCounter++;
      });
      item['fullSelected'] = childCounter === selectedCounter;
    });
  }

  selectionAllCustomTree(event: any) {
    this.customSelectedChildren = [];
    this.customTree.forEach(parentItem => {
      parentItem['children'].forEach(childItem => {
        if (event) {
          this.customSelectedChildren.push(childItem);
        }
        childItem['selected'] = event;
      });
      parentItem['fullSelected'] = event;
    });
    this.selectionChange.emit(this.customSelectedChildren);
  }

  checkAllSelected() {
    let selectedCountParent = 0;
    this.customTree.forEach(parentItem => {
      if (parentItem['fullSelected']) {
        selectedCountParent++;
      }
    });
    this.isSelectedAllChildrenInCustomTree = this.customTree['length'] === selectedCountParent;
  }

  searchChild(event: Event) {
    if (event) {
      const group = [];
      const child = [];
      this.tempInitialGroupArray.forEach(cSChild => {
        if (cSChild['label'].toLowerCase().includes(event.toString().toLowerCase())) {
          group.push(cSChild);
        }
        cSChild['children'].forEach(ch => {
          if (ch['label'].toLowerCase().includes(event.toString().toLowerCase())) {
            child.push(ch);
          }
        });
      });
      // groups
      const filteredGroupsWithChild = [];
      group.forEach(g => {
        const tempG: CustomTreeParentNode = {
          fullSelected: false,
          label: g['label'],
          data: g['data'],
          children: []
        };
        g['children'].forEach(gChild => {
          tempG['children'].push(gChild);
        });
        filteredGroupsWithChild.push(tempG);
      });

      // child
      const childGroups = [];
      child.forEach(childItem => {
        const tempG: CustomTreeParentNode = {
          fullSelected: false,
          label: childItem['parent'],
          data: childItem['parent'],
          children: []
        };
        childGroups.push(tempG);
      });
      child.forEach(childItem => {
        childGroups.forEach(groupItem => {
          if (groupItem['data'] === childItem['parent']) {
            groupItem['children'].push(childItem);
          }
        });
      });

      // merge both groups & child - same type arrays
      let finalChildArray = [];
      filteredGroupsWithChild.forEach(fGWC => {
        fGWC['children'].forEach(ch => {
          finalChildArray.push(ch);
        });
      });
      childGroups.forEach(cG => {
        cG['children'].forEach(ch => {
          finalChildArray.push(ch);
        });
      });
      finalChildArray = _.uniqBy(finalChildArray, 'data');

      let finalGroupsArray = [];
      filteredGroupsWithChild.forEach(fGWC => {
        const finalG: CustomTreeParentNode = {
          fullSelected: false,
          label: fGWC['data'],
          data: fGWC['data'],
          children: []
        };
        finalGroupsArray.push(finalG);
      });

      childGroups.forEach(cG => {
        const finalG: CustomTreeParentNode = {
          fullSelected: false,
          label: cG['data'],
          data: cG['data'],
          children: []
        };
        finalGroupsArray.push(finalG);
      });
      finalGroupsArray = _.uniqBy(finalGroupsArray, 'data');

      finalGroupsArray.forEach(finalGroup => {
        finalChildArray.forEach(finalChild => {
          if (finalGroup['data'] === finalChild['parent']) {
            finalGroup['children'].push(finalChild);
          }
        });
      });
      this.customTree = finalGroupsArray;
      this.checkAllChildSelectedInParticularGroup();
    } else {
      this.customTree = this.tempInitialGroupArray;
    }
    this.checkAllSelected();
  }
}
