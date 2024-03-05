import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Slider } from './models/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Carousel';
  carouselSlides = [
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png',
      caption: 'Dynamic Angular Slider',
    },
  ];

  slideForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.slideForm = this.fb.group({
      imageUrl: ['', Validators.required],
      caption: ['', Validators.required],
    });
  }

// It creates a new slider object with properties imageUrl and caption extracted from the slideForm values.
// It checks if the slideForm is valid.
// If the form is valid, it extracts the imageUrl and caption from the slideForm values again.
// It pushes a new object containing the extracted imageUrl and caption to the carouselSlides array.
// It resets the slideForm to clear the input fields after adding the slide to the carouselSlides array.
  addSlide() {
    const slider: Slider = {
      imageUrl: this.slideForm.value.imageUrl,
      caption: this.slideForm.value.caption,
    };
    if (this.slideForm.valid) {
      const { imageUrl, caption } = this.slideForm.value;
      this.carouselSlides.push({ imageUrl, caption });
      this.slideForm.reset();
    }
  }
  currentIndex = 0;

  // It checks if there is a previous slide available.
  // If there is a previous slide, it decrements the current index to move to the previous slide.
  // If there is no previous slide, it loops back to the last slide by setting the current index to the index of the last slide.
  // The function allows navigation to the previous slide 
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.carouselSlides.length - 1;
    }
  }


  // It checks if the current index is at the last slide or beyond.
  // If the current index is at the last slide or beyond, it sets the current index to 0, effectively looping back to the first slide.
  // If the current index is not at the last slide, it increments the current index to move to the next slide.
  next() {
    if (this.currentIndex >= this.carouselSlides.length-1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
  }

  //Removes the slide at the specified index from the carouselSlides array.
  deleteSlide(index: number) {
    this.carouselSlides.splice(index, 1);
  }
}

