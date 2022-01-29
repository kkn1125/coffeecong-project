export default {
    props: ['itemlist'],
    template: `
    <section class="fence-full fence-lg">
        <div>
            <span class="h5">MD's PICK</span>
        </div>
        <ModuleSlide
        :itemlist="itemlist"/>
    </section>
    `
}

// lorem picsum 교체하기