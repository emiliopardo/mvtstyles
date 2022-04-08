import M$plugin$Mvtstyles from '/home/epardo/proyectos/mvtstyles/src/facade/js/mvtstyles';
import M$control$MvtstylesControl from '/home/epardo/proyectos/mvtstyles/src/facade/js/mvtstylescontrol';
import M$impl$control$MvtstylesControl from '/home/epardo/proyectos/mvtstyles/src/impl/ol/js/mvtstylescontrol';

if (!window.M.plugin) window.M.plugin = {};
if (!window.M.control) window.M.control = {};
if (!window.M.impl) window.M.impl = {};
if (!window.M.impl.control) window.M.impl.control = {};
window.M.plugin.Mvtstyles = M$plugin$Mvtstyles;
window.M.control.MvtstylesControl = M$control$MvtstylesControl;
window.M.impl.control.MvtstylesControl = M$impl$control$MvtstylesControl;
