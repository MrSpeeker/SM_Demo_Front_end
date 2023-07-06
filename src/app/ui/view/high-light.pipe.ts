import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text = '', searchTerm: string): string {
    if (!searchTerm) return text;
    // TODO: Make it so that this is able to take in an array of terms and search for multiple different ones
    // TODO: Make it so that this makes use of position in the text (Back end is looking for synonyms where the front end does not know about them).
    // TODO: Make it so that the term list can handle different colors.

    const re = new RegExp('\\b(' + searchTerm + '\\b)', 'igm');
    text = text.replace(re, '<span class="green">$1</span>');

    return text;
  }
}
