export default {
    data() {
        return {
            footerClass: [
                'footer', 'bg-light', 'p-3', 'w-flex', 'justify-content-start'
            ]
        }
    },
    template: `
    <footer :class="footerClass">
        <span class="brand text-white fw-bold">
            <a href="index.html">Penli</a>
        </span>
        <div class="w-flex justify-content-start ps-3 gx-3">
            <div><a href="https://kkn1125.github.io/typer/" class="nav-link">type</a></div>
            <div><a href="https://kkn1125.github.io/mkDocumentifyJS/" class="nav-link">documentify</a></div>
        </div>
    </footer>
    `,
}