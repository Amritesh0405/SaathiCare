import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HELPERS } from '../../constants/data';

@Component({
  selector: 'app-helpers',
  imports: [CommonModule, RouterLink],
  templateUrl: './helpers.html',
  styleUrl: './helpers.css'
})
export class Helpers {
  helpers = HELPERS;
}