// Phase ranges orient the reader. Every event in a phase shares its broad window.
const christPhases = [
  [6, 1, 'Birth and infancy', [
    ['Gabriel visits Mary', 'In Nazareth, Gabriel announces that Mary will bear Jesus. Luke pairs the annunciation with the promise of John’s birth to Zacharias.', 'Luke 1:5–25', 'Luke 1:26–38'],
    ['Mary visits Elisabeth', 'Elisabeth greets Mary as the mother of her Lord. Mary’s song celebrates God’s mercy and remembrance of His covenant with Abraham.', 'Luke 1:39–56'],
    ['Jesus is born in Bethlehem', 'Luke tells of the manger and the shepherds. Matthew connects Bethlehem to Micah’s prophecy. Compare the Book of Mormon account of the sign of His birth.', 'Luke 2:1–20', 'Matthew 1:18–25', 'Matthew 2:1–6', '3 Nephi 1:4–21'],
    ['Simeon and Anna at the temple', 'Mary and Joseph bring Jesus to Jerusalem. Simeon and Anna recognize Him and speak of redemption.', 'Luke 2:21–39'],
    ['The wise men and the flight to Egypt', 'Matthew tells of the visitors from the east, Herod’s threat, and the family’s flight to Egypt and later settlement in Nazareth.', 'Matthew 2:1–23']
  ]],
  [-7, -12, 'Childhood', [
    ['Jesus at the temple at age twelve', 'Luke gives Jesus’s age at this Passover visit. The broad calendar window reflects uncertainty about His birth year.', 'Luke 2:41–52']
  ]],
  [-26, -30, 'Preparation and early ministry', [
    ['John the Baptist prepares the way', 'Luke places John’s call in the reign of Tiberius and names the governing authorities. John preaches repentance and points to one mightier than himself.', 'Luke 3:1–18', 'Matthew 3:1–12', 'John 1:19–28'],
    ['Jesus is baptized', 'Jesus comes to John at the Jordan. Compare the accounts of the Spirit descending and the Father bearing witness.', 'Matthew 3:13–17', 'Mark 1:9–11', 'Luke 3:21–22', 'John 1:29–34'],
    ['Temptations in the wilderness', 'After fasting, Jesus answers the tempter with scripture. Matthew and Luke arrange the final two temptations in different order.', 'Matthew 4:1–11', 'Luke 4:1–13', 'Mark 1:12–13'],
    ['The first disciples follow Jesus', 'John describes Andrew bringing Simon to Jesus, then Philip inviting Nathanael. Compare the call of fishermen beside the Sea of Galilee in the other Gospels.', 'John 1:35–51', 'Matthew 4:18–22', 'Luke 5:1–11'],
    ['The wedding at Cana', 'John calls the turning of water into wine the first of Jesus’s signs. The disciples respond with belief.', 'John 2:1–11'],
    ['Jesus teaches Nicodemus', 'A Pharisee comes by night and asks about being born again. Jesus teaches of water, the Spirit, and God’s love for the world.', 'John 3:1–21'],
    ['Jesus speaks with the Samaritan woman', 'At Jacob’s well, Jesus teaches about living water and worship. The woman’s testimony brings others to hear Him.', 'John 4:4–42'],
    ['Jesus reads Isaiah in Nazareth', 'At the synagogue Jesus reads Isaiah’s words about good news and liberty, then announces their fulfillment.', 'Luke 4:16–30', 'Isaiah 61:1–2']
  ]],
  [-27, -33, 'Galilean ministry', [
    ['Jesus calls the Twelve', 'Jesus appoints twelve disciples. Luke records that He prays through the night before choosing them.', 'Mark 3:13–19', 'Luke 6:12–16', 'Matthew 10:1–4'],
    ['The Sermon on the Mount', 'Matthew brings together the Beatitudes, teachings on prayer and discipleship, and the image of a house built on rock. Compare Jesus’s later sermon at the temple in Bountiful.', 'Matthew 5', 'Matthew 6', 'Matthew 7', '3 Nephi 12', '3 Nephi 13', '3 Nephi 14'],
    ['Jesus heals a man lowered through a roof', 'Friends bring a paralyzed man to Jesus. The healing accompanies Jesus’s declaration that the man’s sins are forgiven.', 'Mark 2:1–12', 'Matthew 9:1–8', 'Luke 5:17–26'],
    ['Parables of the sower and the kingdom', 'The parable of the sower compares ways people receive the word. Matthew places it alongside other parables about the kingdom of heaven.', 'Matthew 13:1–52', 'Mark 4:1–34', 'Luke 8:4–18'],
    ['Jesus calms the storm', 'A storm threatens the boat on the Sea of Galilee. After Jesus stills the wind and water, the disciples ask who He is.', 'Mark 4:35–41', 'Matthew 8:23–27', 'Luke 8:22–25'],
    ['Jairus’s daughter and the woman who touches Jesus’s garment', 'Mark and Luke place the woman’s healing inside the account of Jairus seeking help for his daughter. Both stories connect faith with reaching out to Jesus.', 'Mark 5:21–43', 'Luke 8:40–56', 'Matthew 9:18–26'],
    ['Jesus feeds the five thousand', 'All four Gospels record the feeding. John follows it with Jesus’s Bread of Life teaching, connecting the sign with a deeper invitation to believe.', 'Matthew 14:13–21', 'Mark 6:30–44', 'Luke 9:10–17', 'John 6:1–14', 'John 6:22–59'],
    ['Jesus walks on the sea', 'Jesus comes to the disciples across the water. Matthew also relates Peter’s attempt to come to Him and Jesus’s rescue.', 'Matthew 14:22–33', 'Mark 6:45–52', 'John 6:16–21'],
    ['Peter testifies of Jesus', 'Near Caesarea Philippi, Peter confesses that Jesus is the Christ. Matthew places this before Jesus begins teaching plainly about His coming death.', 'Matthew 16:13–28', 'Mark 8:27–38', 'Luke 9:18–27'],
    ['The Transfiguration', 'Peter, James, and John witness Jesus’s glory and see Moses and Elias. The Father tells them to hear His Son.', 'Matthew 17:1–9', 'Mark 9:2–10', 'Luke 9:28–36']
  ]],
  [-28, -33, 'Later ministry and the journey to Jerusalem', [
    ['The good Samaritan', 'A question about eternal life and the meaning of neighbor leads to the story of a Samaritan who shows mercy to an injured traveler.', 'Luke 10:25–37'],
    ['Jesus visits Martha and Mary', 'Luke describes Martha serving and Mary listening to Jesus. Compare the sisters’ later conversation with Him at Bethany in John.', 'Luke 10:38–42', 'John 11:17–32'],
    ['Parables of the lost sheep, coin, and son', 'Jesus responds to criticism for welcoming sinners. The three parables picture the joy of recovering what was lost.', 'Luke 15:1–32'],
    ['Jesus raises Lazarus', 'At Bethany, Jesus tells Martha that He is the resurrection and the life. John connects the raising of Lazarus with growing opposition to Jesus.', 'John 11:1–53'],
    ['Zacchaeus welcomes Jesus', 'In Jericho, Jesus visits a chief publican who commits to give to the poor and make restitution.', 'Luke 19:1–10']
  ]],
  [-30, -34, 'Final week in Jerusalem', [
    ['Jesus enters Jerusalem', 'Jesus rides into Jerusalem as crowds welcome Him. Matthew and John connect the entry to the image of Zion’s king in Zechariah.', 'Matthew 21:1–11', 'Luke 19:28–40', 'John 12:12–19', 'Zechariah 9:9'],
    ['Jesus cleanses the temple', 'Matthew, Mark, and Luke place a cleansing near the final week. John recounts a cleansing near the beginning of Jesus’s ministry.', 'Matthew 21:12–17', 'Mark 11:15–19', 'Luke 19:45–48', 'John 2:13–22'],
    ['The Last Supper and washing of feet', 'The Synoptic Gospels recount Jesus giving bread and the cup. John records Jesus washing His disciples’ feet and teaching them to love one another.', 'Matthew 26:17–30', 'Luke 22:14–23', 'John 13:1–17', 'John 13:31–35'],
    ['Jesus prays in Gethsemane', 'Jesus prays to the Father and asks His disciples to watch. The arrest follows. John describes the arrest in a garden across the Kidron.', 'Matthew 26:36–56', 'Mark 14:32–50', 'Luke 22:39–53', 'John 18:1–12'],
    ['Jesus is questioned and tried', 'The Gospels recount questioning by Jewish authorities and the Roman governor Pilate. Luke also describes Jesus being sent to Herod Antipas.', 'Matthew 26:57–75', 'Matthew 27:11–26', 'Luke 23:1–25', 'John 18:28–40'],
    ['Crucifixion and burial', 'The Gospels describe Jesus’s death at Golgotha and His burial by Joseph of Arimathea. Compare 3 Nephi’s account of destruction and darkness around the time of His death.', 'Matthew 27:27–61', 'Mark 15:21–47', 'Luke 23:26–56', 'John 19:16–42', '3 Nephi 8:5–23']
  ]],
  [-30, -34, 'Resurrection and appearances', [
    ['The empty tomb and Mary Magdalene', 'Women come to the tomb early in the week. John recounts Mary Magdalene recognizing the risen Jesus when He calls her by name.', 'Matthew 28:1–10', 'Mark 16:1–8', 'Luke 24:1–12', 'John 20:1–18'],
    ['The road to Emmaus', 'Two disciples hear a stranger explain the scriptures. They recognize the risen Jesus as He breaks bread.', 'Luke 24:13–35'],
    ['Jesus appears to the disciples and Thomas', 'Luke describes the risen Jesus eating with the disciples. John relates Thomas’s encounter and his confession of faith.', 'Luke 24:36–49', 'John 20:19–29'],
    ['Jesus appears by the Sea of Galilee', 'After a catch of fish and a meal, Jesus asks Peter whether he loves Him and charges him to feed His sheep.', 'John 21:1–19'],
    ['The commission and Ascension', 'Matthew records the commission to teach and baptize. Luke and Acts recount the Ascension, with Acts placing it after forty days of appearances.', 'Matthew 28:16–20', 'Luke 24:44–53', 'Acts 1:1–12']
  ]]
];

const jareditePhases = [
  [2300, 2200, 'Origins near Babel', [
    ['Jared and his brother leave Babel', 'The record begins at the scattering associated with the tower. The brother of Jared prays for his family and friends, and the Lord directs the group to depart.', 'Genesis 11:1–9', 'Ether 1:33–43']
  ]],
  [2300, 600, 'Founding generation · calendar dates unknown', [
    ['Journey to the sea and preparation of the barges', 'The group gathers provisions and travels to the coast. Ether records four years at the seashore before the Lord directs the construction of barges for the crossing.', 'Ether 2:1–25'],
    ['The brother of Jared sees the Lord', 'The brother of Jared asks the Lord to touch sixteen stones to give light. The account moves from the preparations for travel to a revelation of Jesus Christ.', 'Ether 3:1–28', 'Ether 4:1–7'],
    ['The Jaredites cross the sea', 'The voyagers give thanks after landing. Ether gives a duration of 344 days for the crossing, without a calendar year for the departure or arrival.', 'Ether 6:1–18'],
    ['Orihah becomes the first king', 'The brother of Jared warns about kingship. After others decline, Orihah accepts and reigns in righteousness.', 'Ether 6:19–30']
  ]],
  [2200, 300, 'Jaredite kings and prophets · calendar dates unknown', [
    ['The genealogy of Ether', 'Moroni opens the abridgment with a line of descent from Ether back to Jared. The genealogy anchors the sequence of the account. The reign narratives also name people outside Ether’s direct line.', 'Ether 1:1–32', 'Ether 7:1–27'],
    ['Kib, Corihor, and Shule', 'Corihor rebels against his father Kib. Shule restores Kib, later becomes king, and protects prophets who call the people to repentance.', 'Ether 7:1–27'],
    ['Omer and the rise of secret combinations', 'Jared, Omer’s son, seeks the throne through an oath-bound conspiracy involving Akish. Omer escapes and is later restored after destructive conflict.', 'Ether 8:1–26', 'Ether 9:1–14'],
    ['Emer, Coriantum, and a later famine', 'The reign of Emer is remembered for prosperity. Generations later, in the days of Heth, prophets warn the people and famine follows.', 'Ether 9:14–35'],
    ['Shez rebuilds and Riplakish falls', 'Shez rebuilds after the famine. Riplakish later imposes heavy burdens and forced labor, and his reign ends in rebellion.', 'Ether 10:1–8'],
    ['Morianton, Lib, and Jaredite prosperity', 'Morianton reunites the kingdom. In a later reign, Lib’s people develop agriculture, textiles, and metalworking. Ether names successive rulers without giving calendar years.', 'Ether 10:9–29'],
    ['Com and the prophets’ warnings', 'Com protects prophets who warn of destruction. Their warnings continue in the generations that follow, leading into the time of Ether.', 'Ether 10:30–34', 'Ether 11:1–23']
  ]],
  [600, 250, 'Final generations · broad study window', [
    ['Ether calls the people to faith and repentance', 'Ether preaches during Coriantumr’s reign. He foretells a New Jerusalem and continues keeping the record after being driven out.', 'Ether 12:1–5', 'Ether 13:1–22'],
    ['Coriantumr and Shiz fight at Ramah', 'Civil war culminates at Ramah. Ether witnesses the end of the Jaredite nation, finishes his record, and hides it. Coriantumr survives the battle.', 'Ether 14', 'Ether 15:1–34'],
    ['Coriantumr lives among the people of Zarahemla', 'Omni says the people of Zarahemla found Coriantumr and that he lived with them for nine moons. This links the narratives without fixing the year of the final battle.', 'Omni 1:20–22', 'Ether 13:20–21']
  ]],
  [125, 120, 'Rediscovery · traditional Book of Mormon chronology', [
    ['Limhi’s search party finds the Jaredite plates', 'The search party encounters ruins and brings back twenty-four gold plates. Mosiah later translates the record. This is a discovery date in the Nephite narrative, centuries after the founding story.', 'Mosiah 8:7–12', 'Mosiah 28:11–19']
  ]]
];
