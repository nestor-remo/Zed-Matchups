const renderGift = async () => {
    
    const requestedID = parseInt(window.location.href.split('/').pop())

    const response = await fetch('/gifts')
    const data = await response.json()

    const giftContent = document.getElementById('gift-content')
    
    let gift

    if (data) {
        gift = data.find(gift => gift.id === requestedID)
    }

    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.name
        document.getElementById('difficulty').textContent = 'Difficulty: ' + gift.difficulty
        document.getElementById('Runes').textContent = 'Runes: ' + gift.Runes
        document.getElementById('description').textContent = gift.description

    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'Gift Not Found 😞'
        giftContent.appendChild(message)
    }
}


renderGift()