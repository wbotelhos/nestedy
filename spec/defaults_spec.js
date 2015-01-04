describe('defaults', function() {
  it ('has the right values', function() {
    // given
    var nestedy = $.fn.nestedy

    // when
    var opt = nestedy.defaults

    // then
    expect(opt.add).toBeUndefined();
    expect(opt.addButton).toEqual('.nestedy-add');
    expect(opt.content).toEqual('.nestedy');
    expect(opt.destroy).toBeFalsy();
    expect(opt.destroyex).toEqual(/(\[)[^\[]*(\])$/);
    expect(opt.excludes).toBeUndefined()
    expect(opt.focus).toEqual(':last');
    expect(opt.idx).toEqual(/(_)\d(_)/);
    expect(opt.model).toEqual('.nestedy-item');
    expect(opt.namex).toEqual(/(\[)\d(\])/);
    expect(opt.remove).toBeUndefined();
    expect(opt.removeButton).toEqual('.nestedy-remove');
    expect(opt.template).toBeUndefined();
  });
});
