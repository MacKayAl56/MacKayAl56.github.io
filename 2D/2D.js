// Define Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialize Phaser game
const game = new Phaser.Game(config);

// Define player variable
let player;

function preload() {
    // Preload assets
    this.load.image('player', 'robot.png');
}

function create() {
    // Create player sprite
    player = this.physics.add.sprite(400, 300, 'player');
    
    // Set bounds so the player cannot leave the screen
    player.setCollideWorldBounds(true);
}

function update() {
    // Handle player movement
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}

