// Enum Gender
const Gender = {
    male: 'Male',
    female: 'Female',
    bede: 'Bede'
}

// Model
var Player = Backbone.Model.extend({
    defaults: {
        name: '',
        age: 0,
        gender: Gender.bede
    }
})

// Collection
var Players = Backbone.Collection.extend({})

var players = new Players()

// Views for 1 player
var PlayerView = Backbone.View.extend({
    tagName: 'tr',
    initialize() {
        this.template = _.template($('.players-list-template').html())
    },
    events: {
        'click .edit-player': 'edit',
        'click .cancel': 'cancel',
        'click .update-player': 'update',
        'click .delete-player': 'delete',
    },
    edit() {
        $('.edit-player').hide()
        $('.delete-player').hide()
        this.$('.update-player').show()
        this.$('.cancel').show()

        var name = this.$('.name').html()
        var age = this.$('.age').html()
        var gender = this.$('.gender').html()

        this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">')
        this.$('.age').html('<input type="text" class="form-control age-update" value="' + age + '">')
        this.$('.gender').html('<input type="text" class="form-control gender-update" value="' + gender + '">')
    },
    cancel() {
        playersView.render()
    },
    update() {
        this.model.set({
            name: $('.name-update').val(),
            age: $('.age-update').val(),
            gender: $('.gender-update').val(),
        })
    },
    delete() {
        this.model.destroy()
    },
    render() {
        this.$el.html(this.template(this.model.toJSON()))
        return this
    }
})

// Views for all players
var PlayersView = Backbone.View.extend({
    model: players,
    el: $('.players-list'),
    initialize() {
        this.model.on('add', this.render, this)
        this.model.on('change', this.render, this)
        this.model.on('remove', this.render, this)
    },
    render() {
        var self = this
        this.$el.html('')
        _.each(this.model.toArray(), (player) => {
            self.$el.append((new PlayerView({model: player})).render().$el)
        })
    }
})

var playersView = new PlayersView()

$(function() {
    $('.add-player').on('click', () => {
        var player = new Player({
            name: $('.name-input').val(),
            age: $('.age-input').val(),
            gender: $('.gender-input').val(),
            // gender: $('.gender-input option:selected').val()
        })
        console.log(player.toJSON())
        players.add(player)
    })
})
