import {Component} from '@angular/core';

@Component({
    selector: 'after-footer',
    styles: [require('./footer.css')],
    template: `
        <div class="footer">
            <a href="https://github.com/Vilsepi/after">lähdekoodi githubissa</a> &#183;
            <a href="https://untappd.com/">data untappd:sta</a> &#183;
            <a href="https://twitter.com/Vilsepi">@vilsepi</a>
        </div>
        `
})
export default class Footer {}
