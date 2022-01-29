export default {
    props: ['recentItem'],
    template: `
    <section class="fence-full fence-lg">
        <ModuleItemView
        :recentItem="recentItem"
        :starPoint="2"
        :blockStar="true"/>
    </section>
    `,
}

// blockStar는 Module의 별점을 체크 가능/불가능 여부 설정