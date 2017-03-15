import {Component, OnInit, Input} from '@angular/core';
import {Menu} from "../../types/Menu";
import {EventsService} from "../../../../services/events/events.service";

@Component({
  selector: 'app-sidebar-dropdown',
  templateUrl: './sidebar-dropdown.component.html',
  styleUrls: ['./sidebar-dropdown.component.scss'],
})
export class SidebarDropdownComponent implements OnInit {

  @Input() item: Menu;

  constructor(private eventService: EventsService) {
    this.eventService.on('menu-toggle', () => {
      for (let menu of <HTMLLIElement[]><any>document.getElementById('sidebar-menu').querySelectorAll('li')) {
        menu.classList.remove('active');
        menu.classList.remove('active-sm');
      }
      for (let menu of <HTMLLIElement[]><any>document.getElementById('sidebar-menu').querySelectorAll('li > ul')) {
        SidebarDropdownComponent.slideUp(menu)
      }
    })
  }

  ngOnInit() {
  }

  anchorClicked(event: MouseEvent) {
    var targetId = event.srcElement.id;
    var target = event.srcElement;
    if (!targetId && event.srcElement.classList.contains('fa')) {
      target = event.srcElement.parentElement;
    }
    if (target.parentElement.classList.contains('active') && document.body.classList.contains('nav-md')) {
      var dropdown = target.parentElement.querySelector('ul');
      SidebarDropdownComponent.slideUp(dropdown);
      target.parentElement.classList.remove('active');
      target.parentElement.classList.remove('active-sm');
    } else {
      if (!target.parentElement.classList.contains('child_menu')) {
        for (let menu of <HTMLLIElement[]><any>document.getElementById('sidebar-menu').querySelectorAll('li')) {
          menu.classList.remove('active');
          menu.classList.remove('active-sm');
        }
        for (let menu of <HTMLLIElement[]><any>document.getElementById('sidebar-menu').querySelectorAll('li > ul')) {
          SidebarDropdownComponent.slideUp(menu)
        }
      }
      target.parentElement.classList.add('active');
      var dropdown = target.parentElement.querySelector('ul');
      SidebarDropdownComponent.slideDown(dropdown);
    }
  }


  static slideDown(elem) {
    elem.style.maxHeight = '1000px';
    //   elem.style.opacity = '1';
  }

  static slideUp(elem) {
    elem.style.maxHeight = '0';
    // elem.style.opacity = '0';
  }

  linkClicked(event: MouseEvent) {
    if (document.body.classList.contains('nav-sm')) {
      let targetUl = event.srcElement.parentElement.parentElement;
      SidebarDropdownComponent.slideUp(targetUl);
    }
  }
}
