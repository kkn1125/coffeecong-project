export default {
    props: ['itemlist'],
    template: `
    <section class="fence-full fence-lg">
        <div>
            <span class="h5">MD's PICK</span>
        </div>
        <module-slide
        :itemlist="itemlist"></module-slide>
    </section>
    `
}

// lorem picsum 교체하기