import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExampleComponent } from './components/example/example.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    NavbarComponent,
    SidebarComponent,
    ChatInputComponent,
    ChatContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
