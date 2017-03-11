function initOrg() {
    //组织面板和在线人员的显示和隐藏事件
    jQuery('#org_panel').bind('_show', function () {
        if (jQuery('#user_online:visible').length > 0) {
            jQuery('#user_online').triggerHandler('_show');
            jQuery('#user_all').triggerHandler('_hide');
        }
        else {
            jQuery('#user_online').triggerHandler('_hide');
            jQuery('#user_all').triggerHandler('_show');
        }
    });
    jQuery('#org_panel').bind('_hide', function () {
        if (timer_online_tree_ref)
            window.clearInterval(timer_online_tree_ref);
        if (jQuery('#user_online:hidden').length > 0)
            jQuery('#user_online').triggerHandler('_hide');
    });

    //在线人员
    jQuery('#user_online').bind('_show', function () {
        if (timer_online_tree_ref)
            window.clearInterval(timer_online_tree_ref);
        if (orgTree0 == null) {
            orgTree0 = new Tree('orgTree0', jsonURL0, '/images/org/');
            orgTree0.BuildTree();
        }
        else if ((new Date()).getTime() - timeLastLoadOnline > monInterval.online * 5 * 1000) {
            orgTree0.tree.reload();
        }

        timer_online_tree_ref = window.setInterval(function () { orgTree0.tree.reload(); }, monInterval.online * 5 * 1000);
        timeLastLoadOnline = (new Date()).getTime();
    });
    jQuery('#user_online').bind('_hide', function () {
        if (timer_online_tree_ref)
            window.clearInterval(timer_online_tree_ref);
    });

    //全部人员第一次显示加载全部人员树
    jQuery('#user_all').bind('_show', function () {
        if (orgTree1 == null) {
            orgTree1 = new Tree('orgTree1', jsonURL1, '/images/org/');
            orgTree1.BuildTree();
        }
    });

    //点击组织弹出或收起对应面板
    jQuery('#org').click(function () {
        if (jQuery(this).attr('class').indexOf('active') >= 0) {
            jQuery('#org_panel').fadeOut((jQuery.browser.msie ? 1 : 300));
            jQuery(this).removeClass('active');
            jQuery('#org_panel').triggerHandler('_hide');
        }
        else {
            jQuery('#smsbox_panel').hide();
            jQuery('#org_panel').fadeIn((jQuery.browser.msie ? 1 : 600), function () { jQuery(this).css('top', jQuery('#south').offset().top - jQuery(this).height() + 3 + 'px'); jQuery('#org_panel').triggerHandler('_show'); });
            jQuery(this).addClass('active');
            window.setTimeout(checkActive, 300, this.id);
        }
    });
}