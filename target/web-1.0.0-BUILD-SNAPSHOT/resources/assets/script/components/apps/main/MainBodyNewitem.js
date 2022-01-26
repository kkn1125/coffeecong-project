export default {
    props: ['recentItem'],
    template: `
    <section class="fence-full fence-lg">
        <module-item-view
        :recentItem="recentItem"
        :starPoint="2"
        :blockStar="true"></module-item-view>
    </section>
    `,
}

// blockStar는 Module의 별점을 체크 가능/불가능 여부 설정