import { Component, OnInit, OnDestroy, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit, OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  ngOnInit() {
    if (globalThis.window !== undefined) {
      this.addBodyClasses();
    }
  }

  ngOnDestroy() {
    if (globalThis.window !== undefined) {
      this.removeBodyClasses();
    }
  }

  private addBodyClasses() {
    const body = this.document.body;
    if (body) {
      this.renderer.addClass(body, 'skin-default');
      this.renderer.addClass(body, 'card-no-border');
    }
  }

  private removeBodyClasses() {
    const body = this.document.body;
    if (body) {
      this.renderer.removeClass(body, 'skin-default');
      this.renderer.removeClass(body, 'card-no-border');
    }
  }
}
