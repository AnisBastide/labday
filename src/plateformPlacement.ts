export default class PlateformPlacement {
    public placeFloor(start: integer, end: integer, y: integer, blockLength: integer, blockName: string, group: Phaser.Physics.Arcade.StaticGroup) {
        group.create(start, y , blockName);
    }
}
