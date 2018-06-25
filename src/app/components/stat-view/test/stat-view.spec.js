import StatView from 'components/stat-view';
import css from './../stat-view.scss';

global.document.documentElement.innerHTML = `
<div>
  <div id="health-1">
    <div class="${css.value__bar}"></div>
  </div>
    <div id="icon-1">
    <div class="icon"></div>
  </div>
</div>`;

const stat_view = new StatView('health', 10, 1);

it('getWidth() should return 20%', () => {
  const new_width = stat_view.getWidth(2);
  expect(new_width).to.equal('20%');
});

it('current_stat_value in update() should be 10', () => {
  stat_view.update(10);
  expect(stat_view.current_stat_value).to.equal(10);
});

it('current_stat_value in update() should be 10', () => {
  stat_view.update(-2);
  expect(stat_view.current_stat_value).to.equal(0);
});

it('getMarkup() should return html', () => {
  const markup = stat_view.getMarkup();
  expect(markup).to.be.a('string');
});

const stat_view_icon = new StatView('icon', 5, 1);

it('current_stat_value in update() should be class-name', () => {
  stat_view_icon.update('class-name');
  expect(stat_view_icon.current_stat_value).to.equal('class-name');
});

it('getMarkup() should return html', () => {
  const markup = stat_view_icon.getMarkup();
  expect(markup).to.be.a('string');
});
