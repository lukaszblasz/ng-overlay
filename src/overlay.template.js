export default function(content){
    return `<div class="ng-overlay-wrapper">
        <div class="ng-overlay-controls">
            <button ng-click="close()" class="ng-overlay-close">Close</button>
        </div>
        <div class="ng-overlay-content">${content}</div>
    </div>`
}